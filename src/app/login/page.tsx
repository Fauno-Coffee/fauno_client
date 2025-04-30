import s from './page.module.css';
import Image from 'next/image';
import { LoginForm } from '@/blocks/LoginForm';

export default function LoginPage() {
  return (
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
        <LoginForm />
      </div>
    </div>
  );
}
