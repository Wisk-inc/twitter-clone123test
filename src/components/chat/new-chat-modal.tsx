import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { query, where } from 'firebase/firestore';
import { usersCollection, chatsCollection } from '@lib/firebase/collections';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { UserCard } from '@components/user/user-card';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type NewChatModalProps = {
  closeModal: () => void;
  onChatSelect: (chatId: string) => void;
};

export function NewChatModal({
  closeModal,
  onChatSelect
}: NewChatModalProps): JSX.Element {
  const { user } = useAuth();
  const { data, loading, error } = useCollection(
    query(usersCollection, where('id', '!=', user?.id ?? ''))
  );

  const createChat = async (targetUser: User): Promise<void> => {
    const chatData = {
      participantIds: [user?.id, targetUser.id],
      lastMessage: null,
      lastMessageAt: null,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    };
    const chatRef = await addDoc(chatsCollection, chatData);
    onChatSelect(chatRef.id);
    closeModal();
  };

  return (
    <div>
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>New Chat</h1>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message='Failed to load users' />
      ) : data ? (
        data.map((user) => (
          <button
            key={user.id}
            className='w-full'
            onClick={() => createChat(user)}
          >
            <UserCard {...user} />
          </button>
        ))
      ) : (
        <p className='p-4 text-center'>No users found.</p>
      )}
    </div>
  );
}
