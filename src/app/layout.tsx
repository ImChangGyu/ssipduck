import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { DefaultLayout } from '~/components/layout';
import { ApolloProvider } from '~/lib/apollo-provider';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppin = Poppins({
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  fallback: [
    '-apple-system',
    'Malgun Gothic',
    'Apple SD Gothic Neo',
    'Roboto',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '씹덕',
  description:
    '애니메이션을 좋아하는 "씹덕"들을 위한 애니메이션 모음집, 씹덕인 당신이 좋아하는 애니메이션을 다른 사람들과 공유해보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={poppin.className}>
        <ApolloProvider>
          <DefaultLayout>{children}</DefaultLayout>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID ?? ''} />
        </ApolloProvider>
      </body>
    </html>
  );
}
