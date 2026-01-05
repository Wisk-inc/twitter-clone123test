import { useState, useEffect } from 'react';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { usersCollection } from '@lib/firebase/collections';
import { useCacheQuery } from './useCacheQuery';
import type { Query } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type UseCollection<T> = {
  data: T[] | null;
  loading: boolean;
};

type DataWithRef<T> = (T & { createdBy: string })[];
type DataWithUser<T> = UseCollection<T & { user: User }>;

export type UseCollectionOptions = {
  includeUser?: boolean;
  allowNull?: boolean;
  disabled?: boolean;
  preserve?: boolean;
  blockedUsers?: string[];
};

export function useCollection<T>(
  query: Query<T>,
  options: {
    includeUser: true;
    allowNull?: boolean;
    disabled?: boolean;
    preserve?: boolean;
    blockedUsers?: string[];
  }
): DataWithUser<T>;

export function useCollection<T>(
  query: Query<T>,
  options?: UseCollectionOptions
): UseCollection<T>;

export function useCollection<T>(
  query: Query<T>,
  options?: UseCollectionOptions
): UseCollection<T> | DataWithUser<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const cachedQuery = useCacheQuery(query);

  const { includeUser, allowNull, disabled, preserve, blockedUsers } = options ?? {};

  useEffect(() => {
    if (disabled) {
      setLoading(false);
      return;
    }

    if (!preserve && data) {
      setData(null);
      setLoading(true);
    }

    const populateUser = async (currentData: DataWithRef<T>): Promise<void> => {
      const dataWithUser = await Promise.all(
        currentData.map(async (currentData) => {
          const user = (
            await getDoc(doc(usersCollection, currentData.createdBy))
          ).data();
          return { ...currentData, user };
        })
      );
      setData(dataWithUser);
      setLoading(false);
    };

    const unsubscribe = onSnapshot(cachedQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) =>
        doc.data({ serverTimestamps: 'estimate' })
      ) as DataWithRef<T>;

      const filteredData = blockedUsers
        ? data.filter((item: any) => {
            if (item.participantIds) {
              return !item.participantIds.some((id: string) =>
                blockedUsers.includes(id)
              );
            }
            return !blockedUsers.includes(item.createdBy);
          })
        : data;

      if (allowNull && !filteredData.length) {
        setData(null);
        setLoading(false);
        return;
      }

      if (includeUser) void populateUser(filteredData);
      else {
        setData(filteredData);
        setLoading(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedQuery, disabled]);

  return { data, loading };
}
