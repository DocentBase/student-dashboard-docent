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
