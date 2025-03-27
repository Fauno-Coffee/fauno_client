import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';
import { SuisseIntl } from '@/shared/fonts';

export const metadata: Metadata = {
  title: '☕ fauno',
  description: 'coffee torrefazione',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${SuisseIntl.className}`}>{children}</body>
    </html>
  );
}
