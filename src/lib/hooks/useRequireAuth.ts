import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import type { User } from '@lib/types/user';

export function useRequireAuth(redirectUrl?: string): User | null {
  const { user, loading, signOut } = useAuth();
  const { replace } = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        void replace(redirectUrl ?? '/');
      } else if (user.kickedAt) {
        void signOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return user;
}
