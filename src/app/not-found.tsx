import s from './page.module.css';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { BurgerNavbar } from '@/components/BurgerNavbar';
import Link from 'next/link';

const Hero = () => {
  // notFound()

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
        <div className={s.text}>
          <h1>Страница не найдена</h1>
          <Link href="/" className={s.button}>Перейти на главную</Link>
        </div>
        {/* <div className={s.hero_content}>
          <FaunoHeroLogo />
        </div> */}
      </main>
    </div>
  );
};

export default Hero