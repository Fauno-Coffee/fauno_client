import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Navbar } from '@/components/Navbar';

export default async function Catalog() {
  return (
    <div className={s.page}>
      <Navbar black />

      <Footer />
    </div>
  );
}
