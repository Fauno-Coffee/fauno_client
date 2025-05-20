'use client';
import s from './Promotions.module.css';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { NextButton } from '@/shared/ui';
import Link from 'next/link';
import { IPromotion } from '@/shared/types/Promotion';

// TODO: СДЕЛАТЬ СЕРВЕРНЫЙ ЗАПРОС

export const Promotions = () => {
  const [promotions, setPromotions] = useState<IPromotion[]>([]);

  async function getRecipes() {
    try {
      const res = await fetch(apiUrlBuilder('/promotion'));
      const data = await res.json();
      setPromotions(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className={s.recipes_wrapper}>
      <div className={s.header}>
        <h2 className={s.title}>Акции</h2>
        <p className={s.subtitle}>
        Ваши преимущества от fauno.<br/>Узнайте больше о выгоде и программе лояльности
        </p>
      </div>

      <div className={s.grid}>
        {promotions.map((r) => (
          <div key={r.id} className={s.card}>
            <div className={s.image}>
              {
                r.imageUrl &&
                <Image
                  src={imageUrlBuilder(r.imageUrl as string)}
                  alt={r.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              }
            </div>
            <div className={s.info}>
              {
                (r.dateFrom && r.dateTo) ?
                  <p className={s.time}>{r.dateFrom.toString().split('T')[0].replaceAll('-', '.')} — {r.dateTo.toString().split('T')[0].replaceAll('-', '.')}</p>
                  : r.dateFrom ?
                  <p className={s.time}>с {r.dateFrom.toString().split('T')[0].replaceAll('-', '.')}</p>
                  : r.dateTo ?
                  <p className={s.time}>с {r.dateTo.toString().split('T')[0].replaceAll('-', '.')}</p>
                  : <></>
              }
              <h3 className={s.cardTitle}>{r.name}</h3>
              <p className={s.cardDesc}>{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
