import type { ReactElement, ReactNode } from 'react';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';

export default function Lists(): JSX.Element {
  return (
    <div className='p-4'>
      <SEO title='Lists / Twitter' />
      <h1 className='text-2xl font-bold'>Lists</h1>
      <p>This page is under construction.</p>
    </div>
  );
}

Lists.getLayout = (page: ReactElement): ReactNode => (
  <MainLayout>{page}</MainLayout>
);
