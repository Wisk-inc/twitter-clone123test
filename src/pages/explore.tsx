import type { ReactElement, ReactNode } from 'react';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';

export default function Explore(): JSX.Element {
  return (
    <div className='p-4'>
      <SEO title='Explore / Twitter' />
      <h1 className='text-2xl font-bold'>Topics</h1>
      <p>This page is under construction.</p>
    </div>
  );
}

Explore.getLayout = (page: ReactElement): ReactNode => (
  <MainLayout>{page}</MainLayout>
);
