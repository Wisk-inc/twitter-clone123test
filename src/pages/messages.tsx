import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { ChatList } from '@components/chat/chat-list';
import { ChatView } from '@components/chat/chat-view';

export default function Messages(): JSX.Element {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <MainLayout>
      <SEO title='Messages / Twitter' />
      <div className='grid h-full grid-cols-[1fr,2fr]'>
        <ChatList onChatSelect={setSelectedChat} />
        {selectedChat ? (
          <ChatView chatId={selectedChat} />
        ) : (
          <div className='flex h-full flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold'>Select a message</h1>
            <p className='text-light-secondary dark:text-dark-secondary'>
              Choose from your existing conversations, start a new one, or just
              keep swimming.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
