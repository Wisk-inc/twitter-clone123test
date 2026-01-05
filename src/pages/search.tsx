import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import { useFunction } from '@lib/hooks/useFunction';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { Tweet } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import type { ReactElement, ReactNode } from 'react';

export default function Search(): JSX.Element {
  const {
    query: { q }
  } = useRouter();
  const { user } = useAuth();
  const { data, loading, error } = useFunction('searchTweets', {
    query: q
  });

  return (
    <MainLayout>
      <SEO title={`Search / Twitter`} />
      <div className='border-b border-light-border dark:border-dark-border'>
        <h1 className='p-4 text-2xl font-bold'>Search</h1>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message='Failed to load search results' />
      ) : data ? (
        data.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
      ) : (
        <p className='p-4 text-center'>No results found.</p>
      )}
    </MainLayout>
  );
}
