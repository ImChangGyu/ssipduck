import { sendGAEvent } from '@next/third-parties/google';

export default function useLogger() {
  function click({ event, value }: { event: string; value?: any }) {
    sendGAEvent({ event, value });
  }
  return { click };
}
