import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { useModal } from '@lib/hooks/useModal';
import { query, where } from 'firebase/firestore';
import { Modal } from '@components/modal/modal';
import { NewChatModal } from './new-chat-modal';
import { chatsCollection } from '@lib/firebase/collections';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { ChatListItem } from './chat-list-item';
import type { Chat } from '@lib/types/chat';

type ChatListProps = {
  onChatSelect: (chatId: string) => void;
};

export function ChatList({ onChatSelect }: ChatListProps): JSX.Element {
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();
  const { data, loading, error } = useCollection(
    query(chatsCollection, where('participantIds', 'array-contains', user?.id ?? '')),
    { blockedUsers: user?.blockedUsers }
  );

  return (
    <div className='border-r border-light-border dark:border-dark-border'>
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <NewChatModal closeModal={closeModal} onChatSelect={onChatSelect} />
      </Modal>
      <div className='flex items-center justify-between p-4'>
        <h1 className='text-2xl font-bold'>Messages</h1>
        <button
          className='rounded-full bg-main-accent p-2 text-white'
          onClick={openModal}
        >
          New Chat
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message='Failed to load chats' />
      ) : data ? (
        data.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            onChatSelect={onChatSelect}
          />
        ))
      ) : (
        <p className='p-4 text-center'>You have no chats yet.</p>
      )}
    </div>
  );
}
