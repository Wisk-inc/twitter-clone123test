import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import type { Functions } from 'firebase/functions';

type UseFunction<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useFunction<T>(
  name: string,
  payload: object
): UseFunction<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const callFunction = async (): Promise<void> => {
      try {
        const functions: Functions = getFunctions();
        const callable = httpsCallable(functions, name);
        const result = await callable(payload);
        setData(result.data as T);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    void callFunction();
  }, [name, payload]);

  return { data, loading, error };
}
