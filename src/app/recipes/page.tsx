import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Navbar } from '@/components/Navbar';
import { BurgerNavbar } from '@/components/BurgerNavbar';
import { Recipes } from '@/blocks/Recipes';
import { Hero } from '@/blocks/Hero';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Clouds } from '@/blocks/Clouds';

export default async function RecipesPage() {
  return (
    <div className={s.page}>
      <BurgerNavbar />
      <Hero />
      <Recipes />
      <Clouds />
      <NotCoffee />

      <Footer />
    </div>
  );
}
