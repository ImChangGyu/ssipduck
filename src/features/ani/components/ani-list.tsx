import FavoriteAni from '~/features/ani/components/favorite-ani';

export default function AniList() {
  return (
    <div className="w-full h-full grid gap-[24px] grid-cols-list mb-[5px] px-[3%] py-[20px] md:px-[5%] justify-items-center">
      {Array.from({ length: 20 }, (_, index) => (
        <div
          key={index}
          className="w-full h-[360px] flex flex-col gap-4 p-6 bg-white border border-transparent rounded-2xl shadow-item hover:border-primary hover:shadow-hover_shadow_color"
        >
          <div className="w-full min-h-[170px] object-cover rounded-lg bg-primary" />
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col gap-[10px]">
              <div className="w-full flex justify-between items-center">
                <div className="w-[90%] text-primary_darken font-bold line-clamp-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque, exercitationem! Velit neque non porro, dolore facilis
                  minima ad fugiat accusantium qui enim quaerat, ab doloribus in
                  nam, consequatur a quo?
                </div>
                <FavoriteAni />
              </div>
              <div className="text-gray_description text-sm mb-4 line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit quaerat placeat impedit eius vitae quae doloremque non
                dolorum libero possimus? Illum alias maiores rerum animi at nemo
                hic, pariatur quae!
              </div>
            </div>
            <div className="w-full flex gap-2">
              <span className="w-auto text-primary opacity-80 text-xs text-center">
                #genre
              </span>
              <span className="w-auto text-primary opacity-80 text-xs text-center">
                #genre
              </span>
              <span className="w-auto text-primary opacity-80 text-xs text-center">
                #genre
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
