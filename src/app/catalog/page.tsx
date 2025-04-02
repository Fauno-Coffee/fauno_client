import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Navbar } from '@/components/Navbar';
import { Catalog } from '@/blocks/Catalog';

export default async function CatalogPage() {
  return (
    <div className={s.page}>
      <Navbar black />

      <Catalog />

      <Footer />
    </div>
  );
}
