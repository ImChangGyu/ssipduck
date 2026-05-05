import { sendGAEvent } from '@next/third-parties/google';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  sendGAEvent({ event, ...params });
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', event);
    if (params?.ani_id) {
      window.clarity('set', 'ani_id', String(params.ani_id));
    }
  }
}
