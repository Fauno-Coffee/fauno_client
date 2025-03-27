import s from './Navbar.module.css';
import { PersonIcon, CartIcon } from '@/shared/assets';
import { FC } from 'react';

interface INavbarProps {
  black?: boolean;
}

export const Navbar: FC<INavbarProps> = ({ black }) => {
  return (
    <header className={s.header} style={{ color: black ? '#000000' : '#FFFFFF' }}>
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
          <PersonIcon color={black ? '#000000' : undefined} />
          <a href='#'>Личный кабинет</a>
        </span>
        <span className={s.link_button}>
          <CartIcon color={black ? '#000000' : undefined} />
          <a href='#'>Корзина</a>
        </span>
      </div>
    </header>
  );
};
