'use client';

import { FaunoHeaderLogo } from '@/shared/assets/FaunoHeaderLogo';
import s from './StickyNavbar.module.css';
import { PersonIcon, CartIcon } from '@/shared/assets';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import Link from 'next/link';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { useEffect, useState } from 'react';

export const StickyNavbar = () => {
  const { switchCart } = useCartStore(state => state);
  const { token } = useUserStore(state => state);

  const [show, setShow] = useState(true)

  const controlNavbar = () => {
    if (window.scrollY > 450) { // if scroll down hide the navbar
      setShow(false); 
    } else { // if scroll up show the navbar
      setShow(true);  
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
       window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  return (
    <header className={`${s.header} ${s.show} ${show ? s.expanded : ""}`} style={{ color: '#000000'}}>
      <div className={s.wrapper}>
        <Link className={s.logo} href='/'>
          <FaunoHeaderLogo width='auto' fill={'black'} />
        </Link>
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
          <a className={s.link_button} href='#'>
            Доставка и оплата
          </a>
        </span>
        <span>
          <a className={s.link_button} href='#'>
            Для бизнеса
          </a>
        </span>
        <span>
          <a className={s.link_button} href='#'>
            О нас
          </a>
        </span>
      </div>
      <div className={s.buttonsWrapper}>
        <Link href={token ? '/profile' : '/login'} className={s.link_button}>
          <PersonIcon color={'#000000'} />
          <p>Личный кабинет</p>
        </Link>
        <button className={s.link_button} onClick={() => switchCart()}>
          <CartIcon color={'#000000'} />
          <p style={{ color: '#000000'}}>Корзина</p>
        </button>
      </div>
    </header>
  );
};
