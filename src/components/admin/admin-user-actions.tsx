import { useAuth } from '@lib/context/auth-context';
import { manageUser } from '@lib/firebase/utils';
import { Button } from '@components/ui/button';
import type { User } from '@lib/types/user';

type AdminUserActionsProps = {
  user: User;
};

export function AdminUserActions({ user }: AdminUserActionsProps): JSX.Element {
  const { signOut } = useAuth();

  const handleBan = async (): Promise<void> => {
    await manageUser(user.status === 'banned' ? 'unban' : 'ban', user.id);
  };

  const handleKick = async (): Promise<void> => {
    await manageUser('kick', user.id);
  };

  const handleTimeout = async (): Promise<void> => {
    await manageUser('timeout', user.id);
  };

  return (
    <div className='flex gap-2'>
      <Button
        className='bg-accent-red text-white'
        onClick={handleBan}
      >
        {user.status === 'banned' ? 'Unban' : 'Ban'}
      </Button>
      <Button
        className='bg-accent-yellow text-white'
        onClick={handleKick}
      >
        Kick
      </Button>
      <Button
        className='bg-accent-blue text-white'
        onClick={handleTimeout}
      >
        Timeout
      </Button>
    </div>
  );
}
