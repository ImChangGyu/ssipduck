import { track } from '~/lib/analytics';

export default function useLogger() {
  function click({ event, value }: { event: string; value?: unknown }) {
    track(event, value !== undefined ? { value } : undefined);
  }

  return { track, click };
}
