import type { Metadata } from 'next';
import { ReactNode } from 'react';
import localFont from 'next/font/local'

import './globals.css';

const SuissIntl = localFont({
  src: [
    {
      path: './fonts/SuisseIntl-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/SuisseIntl-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/SuisseIntl-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SuisseIntl-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/SuisseIntl-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SuisseIntl-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
  ],
})

export const metadata: Metadata = {
  title: '☕ fauno',
  description: 'coffee torrefazione',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${SuissIntl.className}`}>{children}</body>
    </html>
  );
}
