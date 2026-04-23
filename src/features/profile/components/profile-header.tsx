import InitialAvatar from './initial-avatar';
import ProfileEditDialog from './profile-edit-dialog';

interface ProfileHeaderProps {
  profile: {
    id: string;
    nickname: string;
    bio: string | null;
  };
  isOwner: boolean;
}

export default function ProfileHeader({ profile, isOwner }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      <InitialAvatar nickname={profile.nickname} size="lg" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-headline-sm font-bold text-on-surface truncate">
            {profile.nickname}
          </h1>
          {isOwner && (
            <ProfileEditDialog
              currentNickname={profile.nickname}
              currentBio={profile.bio}
            />
          )}
        </div>
        {profile.bio ? (
          <p className="mt-1 text-body-md text-on-surface-variant line-clamp-2">
            {profile.bio}
          </p>
        ) : isOwner ? (
          <p className="mt-1 text-body-md text-on-surface-variant/50 italic">
            한줄소개를 작성해보세요
          </p>
        ) : null}
      </div>
    </div>
  );
}
