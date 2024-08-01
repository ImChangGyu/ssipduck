import * as SVG from '~/assets/svg';

export default function AniModalSkeleton() {
  return (
    <div className="fixed flex items-center justify-center inset-0">
      <div className="w-full h-full fixed top-0 left-0 bg-black opacity-70" />
      <div className="w-[1000px] h-[calc(100vh-100px)] bg-white text-white rounded-lg relative flex flex-col overflow-scroll">
        <div className="w-10 h-10 bg-[#00000055] absolute top-4 right-4 rounded-full flex items-center justify-center z-10 cursor-pointer">
          <SVG.Exit />
        </div>
        <div className="w-full relative">
          <div className="w-full h-[400px] bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]"></div>
          <div className="w-full h-[50px] absolute bottom-0 left-0 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="flex flex-col p-8">
          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h1 className="w-full h-5 bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]"></h1>
              </div>
              <div className="w-full h-[150px] bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]"></div>
              <div className="flex gap-2">
                {Array.from({ length: 3 }, (_, index) => (
                  <span
                    key={`genre_${index}`}
                    className="w-[110px] h-4 opacity-80 bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]"
                  />
                ))}
              </div>
            </div>
            <div className="w-[215px] h-[290px] flex-shrink-0 bg-gray-300 animate-[skeleton_2s_ease-in-out_infinite]"></div>
          </div>
          <div className="mt-10"></div>
        </div>
      </div>
    </div>
  );
}
