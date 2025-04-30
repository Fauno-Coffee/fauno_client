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

export const metadata: Metadata = {
  title: '☕ fauno',
  description: 'coffee torrefazione',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${SuisseIntl.className}`}>
        <UserStoreProvider>
          <CartStoreProvider>
            <SessionLayout>
              <CartLayout>{children}</CartLayout>
            </SessionLayout>
          </CartStoreProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
