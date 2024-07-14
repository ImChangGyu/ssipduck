import FavoriteAni from '~/features/ani/components/favorite-ani';

export default function AniListSkeleton() {
  return (
    <div className="w-full h-full grid gap-[24px] grid-cols-list mb-[5px] px-[3%] py-[20px] md:px-[5%] justify-items-center">
      {Array.from({ length: 50 }, (_, index) => (
        <div
          key={index}
          className="w-full h-[360px] flex flex-col gap-4 p-6 bg-white border border-transparent rounded-2xl shadow-item hover:border-primary hover:shadow-hover_shadow_color"
        >
          <div className="w-full min-h-[170px] object-cover rounded-lg bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]" />
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col gap-[10px] ">
              <div className="w-full h-4 flex justify-between items-center bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]">
                <div className="w-full text-primary_darken" />
              </div>
              <div className="w-full h-14 bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]" />
            </div>
            <div className="w-full flex gap-2 line-clamp-1">
              {Array.from({ length: 3 }, (_, index) => (
                <span
                  key={`genre_${index}`}
                  className="w-[110px] h-4 opacity-80 bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
