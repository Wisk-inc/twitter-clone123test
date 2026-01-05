import type { ReactElement, ReactNode } from 'react';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { query } from 'firebase/firestore';
import { usersCollection } from '@lib/firebase/collections';
import { UserCard } from '@components/user/user-card';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';

export default function Admin(): JSX.Element {
  const { user } = useAuth();
  const { data, loading, error } = useCollection(query(usersCollection));

  if (user?.username !== 'twitblox') {
    return (
      <MainLayout>
        <SEO title='Admin / Twitter' />
        <div className='p-4'>
          <h1 className='text-2xl font-bold'>Admin Panel</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEO title='Admin / Twitter' />
      <div className='border-b border-light-border dark:border-dark-border'>
        <h1 className='p-4 text-2xl font-bold'>Admin Panel</h1>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message='Failed to load users' />
      ) : data ? (
        data.map((user) => <UserCard key={user.id} {...user} />)
      ) : (
        <p className='p-4 text-center'>No users found.</p>
      )}
    </MainLayout>
  );
}
