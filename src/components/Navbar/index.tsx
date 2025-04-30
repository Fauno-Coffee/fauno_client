'use client'

import { FaunoHeaderLogo } from '@/shared/assets/FaunoHeaderLogo';
import s from './Navbar.module.css';
import { PersonIcon, CartIcon, FaunoBigLogo } from '@/shared/assets';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import Link from 'next/link';
import { FC } from 'react';

interface INavbarProps {
  black?: boolean;
}

export const Navbar: FC<INavbarProps> = ({ black }) => {

  const { switchCart } = useCartStore(
    (state) => state,
  )

  return (
    <header className={s.header} style={{ color: black ? '#000000' : '#FFFFFF' }}>
      <div className={s.wrapper}>
        <Link className={s.logo} href='/'><FaunoHeaderLogo fill={black ? 'black' : 'white'} /></Link>
        <span>
          <Link className={s.link_button} href='/catalog'>Каталог</Link>
        </span>
        <span>
          <Link className={s.link_button} href='/recipes'>Рецепты</Link>
        </span>
        <span>
          <a className={s.link_button} href='#'>Доставка и оплата</a>
        </span>
        <span>
          <a className={s.link_button} href='#'>Для бизнеса</a>
        </span>
        <span>
          <a className={s.link_button} href='#'>О нас</a>
        </span>
      </div>
      <div className={s.buttonsWrapper}>
        <Link href='/profile' className={s.link_button}>
          <PersonIcon color={black ? '#000000' : undefined} />
          <p>Личный кабинет</p>
        </Link>
        <button className={s.link_button} onClick={() => switchCart()}>
          <CartIcon color={black ? '#000000' : undefined} />
          <p style={{color: black ? '#000000' : '#FFFFFF'}}>Корзина</p>
        </button>
      </div>
    </header>
  );
};
