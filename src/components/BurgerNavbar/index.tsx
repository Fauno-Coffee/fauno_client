'use client'
import { useState } from 'react';
import s from './BurgerNavbar.module.css';
import { PersonIcon, CartIcon } from '@/shared/assets';
import Link from 'next/link';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';

export const BurgerNavbar = () => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false)
  
  const { switchCart } = useCartStore(state => state);
  const { token } = useUserStore(state => state);

  return (
    <div className={`${s.header}`} style={{ color: '#3C5F3B'}}>
      <div className={s.header_content}>
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
        <Link href='/'>
          <img src="/header_logo.svg" alt="логотип Fauno" />
        </Link>
        <div className={s.wrapper}>
          <Link href={token ? '/profile' : '/login'} className={s.link_button}>
              <PersonIcon color={"#3C5F3B"} /> 
          </Link>
          <button className={s.link_button} onClick={() => switchCart()}>
            <CartIcon color={"#3C5F3B"} />
          </button>
        </div>
      </div>
      {showBurgerMenu && 
        <div className={s.burger_menu}>
          <div></div>
          <div className={s.links}>
            <span>
            <Link className={s.link_button} href='/catalog'>
              Каталог
            </Link>
            </span>
            <span>
              <Link className={s.link_button} href='/recipes'>
                Рецепты
              </Link>
            </span>
            <span>
              <Link className={s.link_button} href='/about'>
                О компании
              </Link>
            </span>
            <span>
              <Link className={s.link_button} href='/delivery'>
                Доставка и оплата
              </Link>
            </span>
            {/* <span>
              <a className={s.link_button} href='#'>
                Доставка и оплата
              </a>
            </span> */}
            <span>
              <a className={s.link_button} href='/business'>
                Для бизнеса
              </a>
            </span>
            {/* <span>
              <a className={s.link_button} href='#'>
                О нас
              </a>
            </span> */}
          </div>
          <div></div>
        </div>
      }
    </div>
  );
};
