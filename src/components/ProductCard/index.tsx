import s from './ProductCard.module.css';

import Image from 'next/image';
import { IProduct } from '@/shared/types/Product';
import { FC } from 'react';
import { imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { numberWithSpaces } from '@/shared/utils/numberWithSpaces';

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
  return (
    <div className={s.card_wrapper}>
      <div className={s.image}>
        <Image
          fill
          objectFit='cover'
          sizes='100%'
          src={imageUrlBuilder(product?.images?.[0].imageUrl)}
          alt={product?.name}
        />
      </div>
      <div className={s.card_info}>
        <span>{product?.name}</span>
        <span>{numberWithSpaces(product?.price)} ₽</span>
      </div>
    </div>
  );
};
