import s from './CategoryCard.module.css';
import { ICategory } from '@/shared/types/Category';
import { FC } from 'react';
import { NextButton } from '@/shared/ui';
import Image from 'next/image';
import { imageUrlBuilder } from '@/shared/utils/urlBuilder';
import Link from 'next/link';
import { ArrowIcon } from '@/shared/assets';

interface ICategoryCardProps {
  category?: Partial<ICategory>;
  noButton?: boolean;
  hardcodeImage?: boolean;
}

export const AllCategoriesCard: FC<ICategoryCardProps> = ({ category }) => {
  console.log(category)
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
        <div className={s.category_name}>filtro</div>
        <div className={s.categories}>
          <Link href={`/catalog?category=1&subcategory=5`} className={s.subcategory}>
            <span className={s.subcategory_name}>classico</span>
            <div className={s.button_outlined}>
              <ArrowIcon />
            </div>
          </Link>
          <Link href={`/catalog?category=1&subcategory=9`} className={s.subcategory}>
            <span className={s.subcategory_name}>integrale</span>
            <div className={s.button_outlined}>
              <ArrowIcon />
            </div>
          </Link>
          <Link href={`/catalog?category=1&subcategory=6`} className={s.subcategory}>
            <span className={s.subcategory_name}>speciale</span>
            <div className={s.button_outlined}>
              <ArrowIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const CategoryCard: FC<ICategoryCardProps> = ({ category, noButton, hardcodeImage }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.background}>
        <Image
          src={
            hardcodeImage
              ? (category?.imageUrl as string)
              : imageUrlBuilder((category?.horizontalImageUrl || category?.imageUrl) as string)
          }
          alt='Background'
          layout='fill'
          style={{zIndex: 1}}
          objectFit='cover'
          objectPosition='center center'
          priority
        />
      </div>
      <div className={s.content}>
        <div className={s.data}>
          <div className={s.category_name}>{category?.name}</div>
          <div className={s.category_desc}>{category?.description}</div>
        </div>
        {!noButton && <NextButton outlined />}
      </div>
    </div>
  );
};
