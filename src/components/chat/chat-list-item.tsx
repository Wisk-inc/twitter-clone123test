import { useAuth } from '@lib/context/auth-context';
import { useUser } from '@lib/hooks/useUser';
import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import type { Chat } from '@lib/types/chat';

type ChatListItemProps = {
  chat: Chat;
  onChatSelect: (chatId: string) => void;
};

export function ChatListItem({
  chat,
  onChatSelect
}: ChatListItemProps): JSX.Element {
  const { user } = useAuth();
  const otherParticipantId = chat.participantIds.find((id) => id !== user?.id);
  const { data: otherUser } = useUser({ id: otherParticipantId });

  if (!otherUser) {
    return <div />;
  }

  return (
    <button
      className='hover-animation grid w-full grid-cols-[auto,1fr] gap-3 px-4 py-3 text-left'
      onClick={() => onChatSelect(chat.id)}
    >
      <UserAvatar src={otherUser.photoURL} alt={otherUser.name} />
      <div className='flex flex-col'>
        <div className='flex gap-1'>
          <UserName {...otherUser} />
          <UserUsername {...otherUser} />
        </div>
        <p className='text-light-secondary dark:text-dark-secondary'>
          {chat.lastMessage}
        </p>
      </div>
    </button>
  );
}
