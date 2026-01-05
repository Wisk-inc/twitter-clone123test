import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import type { Message } from '@lib/types/message';

type MessageProps = {
  message: Message;
};

export function Message({ message }: MessageProps): JSX.Element {
  const { user } = useAuth();
  const isCurrentUser = message.senderId === user?.id;

  return (
    <div
      className={cn(
        'flex items-end gap-2 p-2',
        isCurrentUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-xs rounded-2xl px-3 py-2 text-white',
          isCurrentUser ? 'bg-main-accent' : 'bg-light-secondary'
        )}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
}
