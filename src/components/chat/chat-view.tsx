import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { query, orderBy } from 'firebase/firestore';
import { messagesCollection } from '@lib/firebase/collections';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { Message } from './message';
import { MessageInput } from './message-input';
import type { Chat } from '@lib/types/chat';

type ChatViewProps = {
  chatId: string;
};

export function ChatView({ chatId }: ChatViewProps): JSX.Element {
  const { user } = useAuth();
  const { data, loading, error } = useCollection(
    query(messagesCollection(chatId), orderBy('createdAt', 'asc'))
  );

  return (
    <div className='flex h-full flex-col'>
      <div className='flex-grow overflow-y-auto'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message='Failed to load messages' />
        ) : data ? (
          data.map((message) => <Message key={message.id} message={message} />)
        ) : (
          <p className='p-4 text-center'>
            This is the beginning of your conversation.
          </p>
        )}
      </div>
      <MessageInput chatId={chatId} />
    </div>
  );
}
