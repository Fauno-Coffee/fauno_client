'use client'
import { useState } from 'react';
import s from './BurgerNavbar.module.css';
import { PersonIcon, CartIcon } from '@/shared/assets';

export const BurgerNavbar = () => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false)
  return (
    <header className={s.header} style={{ color: '#3C5F3B'}}>
      <a
          className={s.burger_button}
          onClick={() => {
              setShowBurgerMenu(!showBurgerMenu)
          }}
      >
        <div className={showBurgerMenu ? `${s.burger} ${s.expanded}` : s.burger}>
          <span className={s.bar_1}></span>
          <span className={s.bar_2}></span>
          <span className={s.bar_3}></span>
        </div>
      </a>
      <img src="/header_logo.svg" alt="логотип Fauno" />
      <div className={s.wrapper}>
        <span className={s.link_button}>
          <PersonIcon color={"#3C5F3B"} />
        </span>
        <span className={s.link_button}>
          <CartIcon color={"#3C5F3B"} />
        </span>
      </div>
    </header>
  );
};
