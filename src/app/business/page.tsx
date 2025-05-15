import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Hero } from '@/blocks/Hero';
import { StickyNavbar } from '@/components/StickyNavbar';
import { Business } from '@/blocks/Business';

export default async function CatalogPage() {
  return (
    <div className={s.page}>
      <Hero />
      <StickyNavbar />
      <div className={s.wrapper}>
        <Business />
      </div>

      <Footer />
    </div>
  );
}
