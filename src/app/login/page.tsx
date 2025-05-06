import s from './page.module.css';
import Image from 'next/image';
import { LoginForm } from '@/blocks/LoginForm';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { BurgerNavbar } from '@/components/BurgerNavbar';

export default function LoginPage() {
  return (
    <div className={s.pageWrapper}>
      <Navbar black  />
      <BurgerNavbar />
      <div className={s.page}> 
        <div className={s.image}>
          <Image
            fill
            src='/loginbanner.png'
            alt='Cup of Coffee'
            priority
            sizes='100%'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={s.login_container}>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
