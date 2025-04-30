'use client';
import s from './Recipes.module.css';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { useEffect, useState } from 'react';
import { IRecipe } from '@/shared/types/Recipe';
import Image from 'next/image';

export const Recipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  async function getRecipes() {
    try {
      const res = await fetch(apiUrlBuilder('/recipe'));
      const data = await res.json();
      setRecipes(data.rows || []);
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
        <h2 className={s.title}>Рецепты<br/>приготовления</h2>
        <p className={s.subtitle}>
        Уникальные и простые рецепты кофе: от традиционной турки до авторских ароматических экспериментов, с подробным описанием каждого шага.
        </p>
      </div>

      <div className={s.grid}>
        {recipes.map((r) => (
          <a
            key={r.id}
            href={`/recipes/${r.link}`}
            className={s.card}
          >
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
              <h3 className={s.cardTitle}>{r.name}</h3>
              <p className={s.cardDesc}>{r.steps[0]?.text}</p>
            </div>
            <div className={s.arrow}>
              <span />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
