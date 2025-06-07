import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import { NotCoffee } from '@/blocks/NotCoffee';
import { Clouds } from '@/blocks/Clouds';
import { StickyNavbar } from '@/components/StickyNavbar';
import { Delivery } from '@/blocks/Delivery';

export default async function DeliveryPage() {
  return (
    <div className={s.page}>
      <Hero />
      <StickyNavbar />
      <Delivery />
      <Clouds />
      <NotCoffee />

      <Footer />
    </div>
  );
}
