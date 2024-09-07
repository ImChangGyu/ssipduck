import AniItem from '~/features/ani/components/ani-item';
import { AniItemType } from '~/types/ani';
import { isEmptyArray } from '~/utils/array';

interface AniListWithTitleProps {
  title: string;
  aniList: AniItemType[];
}

export default function AniListWithTitle({
  title,
  aniList,
}: AniListWithTitleProps) {
  return (
    !isEmptyArray(aniList) && (
      <div className="mt-10">
        <h2 className="text-black text-xl font-bold">{title}</h2>
        <div className="w-full h-full grid gap-[24px] grid-cols-modal_list justify-items-center mb-[5px] py-[20px] ">
          {aniList.map((ani) => (
            <AniItem key={`ani-${title}-${ani.id}`} ani={ani} />
          ))}
        </div>
      </div>
    )
  );
}
