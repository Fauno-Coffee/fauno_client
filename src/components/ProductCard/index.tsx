import s from './ProductCard.module.css';

import Image from 'next/image';
import { IProduct } from '@/shared/types/Product';
import { FC } from 'react';
import { imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { numberWithSpaces } from '@/shared/utils/numberWithSpaces';
import Link from 'next/link';

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
  return (
    <Link href={product?.link} className={s.card_wrapper}>
      {product?.images && !!product?.images?.length && (
        <div className={s.image}>
          <Image
            fill
            objectFit='cover'
            sizes='100%'
            src={imageUrlBuilder(product?.images?.[0].imageUrl)}
            alt={product?.name}
            placeholder='blur'
            blurDataURL={imageUrlBuilder(product?.images?.[0].previewUrl)}
          />
        </div>
      )}
      <div className={s.card_info}>
        <span>{product?.name}</span>
        <span>{numberWithSpaces(product?.price)} ₽</span>
      </div>
    </Link>
  );
};
