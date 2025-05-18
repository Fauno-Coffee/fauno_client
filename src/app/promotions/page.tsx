import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Clouds } from '@/blocks/Clouds';
import { StickyNavbar } from '@/components/StickyNavbar';
import { Promotions } from '@/blocks/Promotions';

export default async function RecipesPage() {
  return (
    <div className={s.page}>
      <Hero />
      <StickyNavbar />
      <Promotions />
      <Clouds />
      <NotCoffee />

      <Footer />
    </div>
  );
}
