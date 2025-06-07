import type { Metadata } from 'next';
import { ReactNode } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './globals.css';
import { SuisseIntl } from '@/shared/fonts';
import { SessionLayout } from '@/layouts/SessionLayout';
import { CartStoreProvider } from '@/shared/store/CartStoreProvider';
import { CartLayout } from '@/layouts/CartLayout';
import { UserStoreProvider } from '@/shared/stores/UserStore/UserStoreProvider';
import Script from 'next/script';
import { ZakharCrumbleCookie } from '@/layouts/CookieWrapper';

export const metadata: Metadata = {
  title: 'Fauno',
  description: 'coffee torrefazione',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <Script
          id='cloudpayments-config'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
                window.cp_publicId = "${process.env.NEXT_PUBLIC_CP_PUBLIC_ID}";
                window.cp_currency = "RUB";
                window.cp_lang = "ru-RU";
              `,
          }}
        />
        <Script src='https://widget.cloudpayments.ru/bundles/cloudpayments.js' />
        <link rel='icon' href='/favicon.svg' sizes='any' />
      </head>

      <body className={`${SuisseIntl.className}`}>
        <UserStoreProvider>
          <CartStoreProvider>
            <SessionLayout>
              <CartLayout>{children}</CartLayout>
            </SessionLayout>
          </CartStoreProvider>
        </UserStoreProvider>
        <ZakharCrumbleCookie />
      </body>
    </html>
  );
}
