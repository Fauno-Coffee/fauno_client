'use client';

import { FC, ReactNode, useEffect } from 'react';
import s from './styles.module.css';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import axios from 'axios';

interface LayoutProps {
  children: ReactNode;
}

export const CartLayout: FC<LayoutProps> = ({ children }) => {
    const {
        cart,
        show,
        switchCart,
        fetchCart
    } = useCartStore((state) => state);

    useEffect(() => {
        fetchCart?.();
    }, [fetchCart]);

    async function incrementItem(id: number) {
        const url = `/user/plusCart`;
        try {
            await axios.post(apiUrlBuilder(url), {
                session: localStorage.getItem("session"),
                productId: id
            });
            fetchCart()
        } catch (error) {
          console.log(error);
        }
    }
    
    async function decrementItem(id: number) {
        const url = `/user/minusCart`;
        try {
            await axios.post(apiUrlBuilder(url), {
                session: localStorage.getItem("session"),
                productId: id
            });
            fetchCart()
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <>
      {show && (
        <div
          className={s.cartBackground}
          role="dialog"
          aria-modal
          onClick={switchCart}
        >
          <aside
            className={s.cartWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={s.cartHeader}>
              <h2 className={s.cartName}>Ваш заказ</h2>
              <button
                className={s.closeBtn}
                aria-label="Закрыть корзину"
                onClick={switchCart}
              >
                ×
              </button>
            </header>

            <section className={s.cartItemsList}>
              {cart.length === 0 && (
                <p className={s.emptyMsg}>Корзина пока пуста</p>
              )}

              {cart.map((item) => (
                <article key={item.id} className={s.cartItem}>
                  <div className={s.itemInfo}>
                    <p className={s.itemName}>{item.product.name}</p>
                    <p className={s.itemPrice}>
                      {(item.product.price * item.count).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>

                  <div className={s.itemControls}>
                    <button
                      className={s.qtyBtn}
                      onClick={() => decrementItem(item.product.id)}
                      aria-label="Минус один"
                    >
                      −
                    </button>
                    <span className={s.qtyValue}>{item.count}</span>
                    <button
                      className={s.qtyBtn}
                      onClick={() => incrementItem(item.product.id)}
                      aria-label="Плюс один"
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </aside>
        </div>
      )}

      {children}
    </>
  );
};
