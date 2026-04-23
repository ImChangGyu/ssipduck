import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { cn } from '~/lib/utils';

const AVATAR_COLORS = [
  'bg-primary-container text-on-primary-container',
  'bg-secondary-container text-on-secondary-container',
  'bg-tertiary-container text-on-tertiary-container',
  'bg-error-container text-on-error-container',
];

function pickColor(nickname: string) {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = (hash * 31 + nickname.charCodeAt(i)) | 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface InitialAvatarProps {
  nickname: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'size-8 text-label-md',
  md: 'size-12 text-title-sm',
  lg: 'size-20 text-headline-lg',
};

export default function InitialAvatar({ nickname, size = 'md', className }: InitialAvatarProps) {
  const colorClass = pickColor(nickname);
  const initial = nickname.charAt(0).toUpperCase();

  return (
    <Avatar className={cn(SIZE_CLASSES[size], className)}>
      <AvatarFallback className={cn('font-semibold', colorClass)}>
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}
