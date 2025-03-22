import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';

export default function Home() {
  return (
    <div className={s.page}>
      <Hero />
      <Footer />
    </div>
  );
}
