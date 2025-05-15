import { Delivery } from '@/shared/assets/Delivery';
import s from './feautures.module.css';
import { Touring } from '@/shared/assets/Touring';
import { BusinessIcon } from '@/shared/assets/BysinessIcon';

export const Feautures = () => {
  return (
    <section className={s.block}>
      <div className={s.blockContent}>
        <div className={s.feauture}>
          <Touring />
          <p className={s.name}>fauno™: Touring Club</p>
        </div>
        <div className={s.feauture}>
          <Delivery />
          <p className={s.name}>Бесплатная доставка от 3500₽</p>
        </div>
        <div className={s.feauture}>
          <BusinessIcon />
          <p className={s.name}>fauno™: для бизнеса</p>
        </div>
        <div className={s.feauture}>
          <Touring />
          <p className={s.name}>Рецепты приготовления</p>
        </div>
      </div>
    </section>
  );
};
