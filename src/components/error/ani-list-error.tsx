import Button from '~/components/ui/button/button';

interface AniListErrorProps {
  error: Error;
  reset: () => void;
}

export default function AniListError({ error, reset }: AniListErrorProps) {
  console.log(error);
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-8">
      <h1 className="text-[32px] text-[#333] font-bold">
        Internal Server Error
      </h1>
      <span className="text-center text-gray-400">
        Oops...
        <br />
        Something Went Wrong
      </span>
      <Button variants="error" size="xl" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
