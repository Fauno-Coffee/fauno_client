import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Recipes } from '@/blocks/Recipes';
import { Hero } from '@/blocks/Hero';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Clouds } from '@/blocks/Clouds';
import { StickyNavbar } from '@/components/StickyNavbar';
import { About } from '@/blocks/About';
import { Agreement } from '@/blocks/Agreement';

export default async function AgreementPage() {
  return (
    <div className={s.page}>
      <Hero />
      <StickyNavbar />
      <Agreement />
      <Clouds />
      <NotCoffee />

      <Footer />
    </div>
  );
}
