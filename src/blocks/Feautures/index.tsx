import { Delivery } from '@/shared/assets/Delivery';
import s from './feautures.module.css';
import { Touring } from '@/shared/assets/Touring';
import { BusinessIcon } from '@/shared/assets/BysinessIcon';
import Link from 'next/link';

export const Feautures = () => {
  return (
    <section className={s.block}>
      <div className={s.blockContent}>
        <Link href="/promotions" className={s.feauture}>
          <Touring />
          <p className={s.name}>fauno™: Touring Club</p>
        </Link>
        <Link href="/promotions" className={s.feauture}>
          <Delivery />
          <p className={s.name}>Бесплатная доставка от 3500₽</p>
        </Link>
        <Link href="/business" className={s.feauture}>
          <BusinessIcon />
          <p className={s.name}>fauno™: для бизнеса</p>
        </Link>
        <Link href="/recipes" className={s.feauture}>
          <Touring />
          <p className={s.name}>Рецепты приготовления</p>
        </Link>
      </div>
    </section>
  );
};
