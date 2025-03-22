import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({
  subsets: ['cyrillic-ext'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: '☕ fauno',
  description: 'coffee torrefazione',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${inter.className}`}>{children}</body>
    </html>
  );
}
