import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Clouds } from '@/blocks/Clouds';
import { Recipe } from '@/blocks/Recipe';
import { Navbar } from '@/components/Navbar';
import { BurgerNavbar } from '@/components/BurgerNavbar';
import { Order } from '@/blocks/Order';

export default async function OrderPage() {
  return (
    <div className={s.page}>
      <Navbar black />
      <BurgerNavbar />
      <Order />
      <Footer />
    </div>
  );
}
