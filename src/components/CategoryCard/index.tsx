import s from './CategoryCard.module.css';
import { ICategory } from '@/shared/types/Category';
import { FC } from 'react';
import { NextButton } from '@/shared/ui';
import Image from 'next/image';

interface ICategoryCardProps {
  category: ICategory;
}

export const AllCategoriesCard: FC<ICategoryCardProps> = ({ category }) => {
  return (
    <div className={s.all_wrapper}>
      <div className={s.background}>
        <video
          width='100%'
          height='100%'
          autoPlay
          loop
          muted
          preload='auto'
          playsInline
          style={{ objectFit: 'cover' }}
        >
          <source src='/filtro.mp4' type='video/mp4' />
        </video>
      </div>
      <div className={s.background_fx_up}></div>
      <div className={s.background_fx_down}></div>
      <div className={s.content}>
        <div className={s.category_name}>{category?.name}</div>
        <div className={s.categories}>
          <div className={s.subcategory}>
            <span className={s.subcategory_name}>Integrale</span>
            <NextButton />
          </div>
          <div className={s.subcategory}>
            <span className={s.subcategory_name}>Classico</span>
            <NextButton />
          </div>
          <div className={s.subcategory}>
            <span className={s.subcategory_name}>Issimo</span>
            <NextButton />
          </div>
          <div className={s.subcategory}>
            <span className={s.subcategory_name}>Speciale</span>
            <NextButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryCard: FC<ICategoryCardProps> = ({ category }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.background}>
        <Image
          src={category?.imageUrl as string}
          alt='Background'
          layout='fill'
          objectFit='cover'
          objectPosition='center top'
          priority
        />
      </div>
      <div className={s.content}>
        <div className={s.data}>
          <div className={s.category_name}>{category?.name}</div>
          <div className={s.category_desc}>{category?.description}</div>
        </div>
        <NextButton outlined />
      </div>
    </div>
  );
};
