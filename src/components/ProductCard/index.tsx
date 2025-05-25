'use client'
import s from './ProductCard.module.css';

import Image from 'next/image';
import { IProduct } from '@/shared/types/Product';
import { FC } from 'react';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { numberWithSpaces } from '@/shared/utils/numberWithSpaces';
import Link from 'next/link';
import axios from 'axios';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { AddToCartIcon } from '@/shared/assets/AddToCartIcon';

interface IProductCardProps {
  product: IProduct;
  cartButton?: boolean;
  isAddToCart?: boolean;
}

export const ProductCard: FC<IProductCardProps> = ({ product, isAddToCart = false }) => {
  const { openCart } = useCartStore(state => state);
  const { user } = useUserStore(state => state);

  async function addToCart(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const url = `/user/plusCart`;
    try {
      await axios.post(apiUrlBuilder(url), {
        session: localStorage.getItem('session'),
        productId: product?.id,
      });
      openCart(user.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Link href={'product/' + product?.link} className={s.card_wrapper}>
      <div className={s.brightness}>
        <p className={s.brightnessTitle}>Ключевой Дескриптор</p>
        <p className={s.brightnessValue}>{product.keyDescriptor}</p>
      </div>
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
        <div className={s.card_info_text}>
          <span>{product?.name}</span>
          <span>{numberWithSpaces(product?.price)} ₽</span>
        </div>

        { isAddToCart &&
          <div className={s.buttonWrapper}>
            <button className={s.addToCart} onClick={addToCart}>
              <AddToCartIcon />
            </button>
          </div>
        }
      </div>
    </Link>
  );
};
