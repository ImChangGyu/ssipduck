import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';

interface AniListErrorProps {
  error: Error;
  reset: () => void;
}

export default function AniListError({ error: _error, reset }: AniListErrorProps) {
  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-center items-center gap-6 px-6 text-center">
      <Alert variant="destructive" className="max-w-sm">
        <AlertCircle />
        <AlertTitle>잠시 오류가 발생했어요</AlertTitle>
        <AlertDescription>
          서버가 너무 많은 요청으로 잠시 쉬고 있어요.
          <br />
          잠시 후 다시 시도해주세요.
        </AlertDescription>
      </Alert>

      <Button variant="secondary" onClick={reset}>
        다시 시도하기
      </Button>
    </div>
  );
}
