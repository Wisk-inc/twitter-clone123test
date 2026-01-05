import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { manageBlock } from '@lib/firebase/utils';
import { Button } from './button';
import { HeroIcon } from './hero-icon';
import { ToolTip } from './tooltip';
import type { User } from '@lib/types/user';

type BlockButtonProps = {
  userTargetId: string;
  userTargetUsername: string;
};

export function BlockButton({
  userTargetId,
  userTargetUsername
}: BlockButtonProps): JSX.Element {
  const { user, updateUser } = useAuth();
  const { blockedUsers } = user as User;

  const isBlocked = blockedUsers.includes(userTargetId);

  const handleBlock = async (): Promise<void> => {
    const newBlockedUsers = isBlocked
      ? blockedUsers.filter((id) => id !== userTargetId)
      : [...blockedUsers, userTargetId];
    updateUser({ ...user, blockedUsers: newBlockedUsers } as User);
    await manageBlock(isBlocked ? 'unblock' : 'block', user?.id as string, userTargetId);
  };

  return (
    <Button
      className={cn(
        `dark-bg-tab group relative border border-light-line-reply p-2 hover:bg-light-primary/10
         active:bg-light-primary/20 dark:border-light-secondary dark:hover:bg-dark-primary/10
         dark:active:bg-dark-primary/20`,
        isBlocked ? 'bg-accent-red/10 text-accent-red' : ''
      )}
      onClick={handleBlock}
    >
      <HeroIcon
        className='h-5 w-5'
        iconName={isBlocked ? 'UserMinusIcon' : 'UserPlusIcon'}
      />
      <ToolTip tip={isBlocked ? `Unblock @${userTargetUsername}` : `Block @${userTargetUsername}`} />
    </Button>
  );
}
