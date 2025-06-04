'use client';
import s from './Recipe.module.css';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { useEffect, useState } from 'react';
import { IRecipe } from '@/shared/types/Recipe';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LeftArrow } from '@/shared/assets/LeftArrow';
import { Breadcrubs } from '../Breadcrubs/Breadcrubs';

export const Recipe = () => {
  const [recipe, setRecipe] = useState<IRecipe>();

  const { id } = useParams();

  async function getRecipe() {
    try {
      const res = await fetch(apiUrlBuilder(`/recipe/${id}`));
      const data = await res.json();
      console.log(data)
      setRecipe(data|| []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className={s.recipes_wrapper}>
      <div className={s.header}>
        <Breadcrubs data={[{name: "Главная", link: "/"}, {name: "Рецепты", link: "/recipes"}, {name: recipe?.name || '', link: "/recipes/"+recipe?.link}]} />
        <h2 className={s.title}>{recipe?.name}</h2>
      </div>
      <div className={s.recipeSteps}>
        {
          recipe?.steps.map((step, index) => {
            return(
              <div key={index} className={s.step}>
                <div className={s.stepInfo}>
                  <p className={s.stepNumber}>Шаг {index+1}</p>
                  <p className={s.stepText}>{step.text}</p>
                </div>
                <div className={s.imageWrapper}>
                  <Image 
                    src={imageUrlBuilder(step.imageUrl as string)}
                    alt={step.text}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};
