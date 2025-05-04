import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Clouds } from '@/blocks/Clouds';
import { Recipe } from '@/blocks/Recipe';
import { Navbar } from '@/components/Navbar';
import { BurgerNavbar } from '@/components/BurgerNavbar';
import { StickyNavbar } from '@/components/StickyNavbar';

export default async function RecipesPage() {
  return (
    <div className={s.page}>
      <BurgerNavbar />
      <Navbar black />
      <StickyNavbar />
      <Recipe />
      <Clouds />
      <NotCoffee />

      <Footer />
    </div>
  );
}
