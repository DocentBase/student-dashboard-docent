import type { Metadata } from 'next';
import { Instrument_Sans, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/globals.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DocentBase | Student Operational Cockpit',
  description: 'Precision operational cockpit for DocentBase students',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${instrumentSans.variable} ${geistMono.variable}`}>
        <body className={instrumentSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
