'use client';

import s from './freeDelivery.module.css';
import { useEffect, useState } from 'react';
import { IProduct } from '@/shared/types/Product';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import axios from 'axios';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import Link from 'next/link';

export const FreeDelivery = ({ product }: { product?: IProduct }) => {
  const { cart } = useCartStore(state => state);

  const [productInCart, setProductInCart] = useState(false);
  useEffect(() => {
    if (product) {
      const inCartId = cart.findIndex(productInCart => productInCart.productId === product.id);
      if (inCartId !== -1) setProductInCart(true);
    }
  }, [product, cart]);

  const { openCart } = useCartStore(state => state);
  const { user } = useUserStore(state => state);

  async function addToCart() {
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
    <section className={s.delivery_wrapper}>
      <div className={s.text}>
        <div className={s.title}>Бесплатная доставка от 3500₽</div>
        <div className={s.cart_button}>
          {productInCart ? (
            <Link href='/catalog'>
              <button>Перейти в каталог</button>
            </Link>
          ) : (
            <button onClick={addToCart}>Добавить в корзину</button>
          )}
        </div>
      </div>
      <div className={s.image}>
        <Image
          fill
          src='/skald.png'
          alt='Fauno Storage'
          priority
          sizes='100%'
          style={{ objectFit: 'cover' }}
        />
      </div>
    </section>
  );
};
