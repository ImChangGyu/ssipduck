import Button from '~/components/ui/button/button';

interface AniListErrorProps {
  error: Error;
  reset: () => void;
}

export default function AniListError({ error, reset }: AniListErrorProps) {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-8">
      <h1 className="text-[32px] text-[#333] font-bold">
        Internal Server Error
      </h1>
      <span className="text-center text-gray-400">
        서버가 너무 많은 요청으로 인해 잠시 아야하고 있어요
        <br />
        조금 기다린 후 새로고침하거나 아래의 다시시도 하기 버튼을 눌러주세요
      </span>
      <Button variants="error" size="m" onClick={reset}>
        다시시도 하기
      </Button>
    </div>
  );
}
