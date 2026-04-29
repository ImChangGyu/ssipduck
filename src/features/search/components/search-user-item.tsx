'use client';

import Link from 'next/link';
import InitialAvatar from '~/features/profile/components/initial-avatar';
import { UserSearchItem } from '~/features/search/api/get-search-users';

interface SearchUserItemProps {
  user: UserSearchItem;
  onClick?: () => void;
}

export default function SearchUserItem({ user, onClick }: SearchUserItemProps) {
  return (
    <Link
      href={`/profile/${user.id}`}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 rounded-md
        hover:bg-surface-container transition-colors"
    >
      <InitialAvatar nickname={user.nickname} size="sm" />
      <div className="flex flex-col min-w-0">
        <span className="text-label-lg text-on-surface font-medium leading-snug truncate">
          {user.nickname}
        </span>
        {user.bio && (
          <span className="text-body-sm text-on-surface-variant line-clamp-1">
            {user.bio}
          </span>
        )}
      </div>
    </Link>
  );
}
