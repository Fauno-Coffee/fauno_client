'use client';

import { FC, ReactNode, useEffect } from 'react';
import s from './styles.module.css';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/shared/types/Product';
import { ICart } from '@/shared/store/store';

interface LayoutProps {
  children: ReactNode;
}

export const CartLayout: FC<LayoutProps> = ({ children }) => {
  const { cart, show, switchCart, fetchCart } = useCartStore(state => state);

  const { user } = useUserStore(state => state);

  const router = useRouter();

  useEffect(() => {
    fetchCart?.(user.id);
  }, [fetchCart, user.id]);

  async function incrementItem(item: ICart) {
    const url = `/user/plusCart`;
    try {
      await axios.post(apiUrlBuilder(url), {
        session: localStorage.getItem('session'),
        userId: user.id,
        productId: item?.product?.id,
        selectorValue: item?.selectorValue,
      });
      fetchCart(user.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function decrementItem(item: ICart) {
    const url = `/user/minusCart`;
    try {
      await axios.post(apiUrlBuilder(url), {
        session: localStorage.getItem('session'),
        userId: user.id,
        productId: item?.product?.id,
        selectorValue: item?.selectorValue,
      });
      fetchCart(user.id);
    } catch (error) {
      console.log(error);
    }
  }

  const orderHandler = () => {
    switchCart();
    router.push(user.id ? '/order' : '/login?backUrl=/order');
  };

  const cartPrices = cart.map(p => p.product.price * p.count);
  const cartTotal = cartPrices.reduce((prev, curr) => prev + curr, 0);

  return (
    <>
      {show && (
        <div className={s.cartBackground} role='dialog' aria-modal onClick={switchCart}>
          <aside className={s.cartWrapper} onClick={e => e.stopPropagation()}>
            <header className={s.cartHeader}>
              <h2 className={s.cartName}>Ваш заказ</h2>
              <button className={s.closeBtn} aria-label='Закрыть корзину' onClick={switchCart}>
                ×
              </button>
            </header>

            <section className={s.cartItemsList}>
              {cart.length === 0 && <p className={s.emptyMsg}>Корзина пока пуста</p>}

              {cart.map(item => (
                <article key={item.id} className={s.cartItem}>
                  <div className={s.imageInfo}>
                    <div className={s.imageWrapper}>
                      <Image
                        src={imageUrlBuilder(item.product.images[0].imageUrl)}
                        alt={item.product.name}
                        style={{ objectFit: 'cover' }}
                        fill
                      />
                    </div>
                    <div className={s.itemInfo}>
                      <p className={s.itemName}>{item.product.name}</p>
                      <p className={s.itemPrice}>
                        {(item.product.price * item.count).toLocaleString('ru-RU')} ₽
                      </p>
                      {item?.product?.selector && item.selectorValue && (
                        <p className={s.itemPrice}>
                          {item.product?.selector?.name} - {item.selectorValue}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={s.itemControls}>
                    <button
                      className={s.qtyBtn}
                      onClick={() => decrementItem(item)}
                      aria-label='Минус один'
                    >
                      −
                    </button>
                    <span className={s.qtyValue}>{item.count}</span>
                    <button
                      className={s.qtyBtn}
                      onClick={() => incrementItem(item)}
                      aria-label='Плюс один'
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
              {cart.length > 0 && (
                <button onClick={orderHandler} className={s.orderButton}>
                  Оформить заказ — {cartTotal.toLocaleString('ru-RU')} ₽
                </button>
              )}
            </section>
          </aside>
        </div>
      )}

      {children}
    </>
  );
};
