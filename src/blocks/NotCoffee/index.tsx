'use client'
import s from './notCoffee.module.css';
import { LightArrow } from '@/shared/assets/LightArrow';
import Link from 'next/link';

export const NotCoffee = () => {
  return (
    <section className={s.block}>
      <div className={s.blockContent}>
        <div className={s.headingWrapper}>
          <h1 className={s.heading}>Не коффе</h1>
          <p className={s.description}>Наша коллекция для дома, продолжает традицию наполнять привычные ритуалы атмосферой. Свеча для ароматерапии, выполненная из натурального кокосового воска с парфюмерной композицией</p>
        </div>
        <div className={s.cards}>
          <Link 
            className={s.card} 
            href="/products?category=goods" 
          >
            <div className={s.card_bg} style={{backgroundImage: "url('/goods.png')"}}></div>
            <div className={s.shadow}></div>
            <div className={s.cardInfo}>
              <h2 className={s.name}>Goods</h2>
              <LightArrow />
            </div>
          </Link>
          <Link 
            className={s.card} 
            href="/products?category=gifts" 
          >
            <div className={s.card_bg} style={{backgroundImage: "url('/gifts.png')"}}></div>
            <div className={s.shadow}></div>
            <div className={s.cardInfo}>
              <h2 className={s.name}>Gift kits</h2>
              <LightArrow />
            </div>
          </Link>
          <Link 
            className={s.card} 
            href="/products?category=home" 
          >
            <div className={s.card_bg} style={{backgroundImage: "url('/home.png')"}}></div>
            <div className={s.shadow}></div>
            <div className={s.cardInfo}>
              <h2 className={s.name}>Home collection</h2>
              <LightArrow />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
