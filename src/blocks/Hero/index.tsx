import s from './Hero.module.css';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { FaunoHeroLogo } from '@/shared/assets';
import { BurgerNavbar } from '@/components/BurgerNavbar';

export const Hero = () => {
  return (
    <div className={s.hero}>
      <div className={s.navbar_wrapper}>
        <Navbar />
        <BurgerNavbar />
      </div>
      <main className={s.hero_main}>
        <div className={s.background}>
          <Image
            src='/herobg.jpeg'
            alt='Background'
            layout='fill'
            objectFit='cover'
            objectPosition='center top'
            priority
          />
        </div>
        <div className={s.hero_content}>
          <FaunoHeroLogo />
        </div>
      </main>
    </div>
  );
};
