import s from './Navbar.module.css';
import { PersonIcon, CartIcon } from '@/shared/assets';

export const Navbar = () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <span>
          <a href='#'>Кофе</a>
        </span>
        <span>
          <a href='#'>Не кофе</a>
        </span>
        <span>
          <a href='#'>Доставка и оплата</a>
        </span>
        <span>
          <a href='#'>Для бизнеса</a>
        </span>
        <span>
          <a href='#'>О нас</a>
        </span>
      </div>
      <div className={s.wrapper}>
        <span className={s.link_button}>
          <PersonIcon />
          <a href='#'>Личный кабинет</a>
        </span>
        <span className={s.link_button}>
          <CartIcon />
          <a href='#'>Корзина</a>
        </span>
      </div>
    </header>
  );
};
