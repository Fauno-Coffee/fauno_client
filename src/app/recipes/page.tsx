import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Recipes } from '@/blocks/Recipes';
import { Hero } from '@/blocks/Hero';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Clouds } from '@/blocks/Clouds';
import { StickyNavbar } from '@/components/StickyNavbar';

export default async function RecipesPage() {
  return (
    <div className={s.page}>
      <Hero />
      <StickyNavbar />
      <Recipes />
      <Clouds />
      <NotCoffee />

      <Footer />
    </div>
  );
}
