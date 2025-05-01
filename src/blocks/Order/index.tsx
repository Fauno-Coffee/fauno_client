'use client';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import s from './Order.module.css';
import Image from 'next/image';
import { imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { TitledInput } from '@/shared/ui/TitledInput';
import { ChangeEvent, useEffect, useState } from 'react';

export const Order = () => {

  const { cart } = useCartStore((state) => state);
  const { user } = useUserStore((state) => state);

  const [mail, setMail] = useState(user.mail || "")
  const [name, setName] = useState(user.name || "")

  useEffect(() => {
    setMail(user.mail || "")
    setName(user.name || "")
  }, [user])
  
  const [address, setAddress] = useState("")
  const [flat, setFlat] = useState("")
  const [building, setBuilding] = useState("")
  const [floor, setFloor] = useState("")
  // домофон
  const [intercom, setIntercom] = useState("")
  const [comment, setComment] = useState("")

  const cartPrices = cart.map((p) => p.product.price * p.count) 
  const cartTotal = cartPrices.reduce((prev, curr) => prev + curr, 0);
  let userTotal = cartTotal

  if(user.discount && user.discount > 0){
    userTotal = cartTotal * (1 - user.discount / 100)
  }

  return (
    <div className={s.blockWrapper}>
      <p className={s.title}>Оформление заказа</p>
      <div className={s.order_wrapper}>
        <div className={s.orderInfo}>
          <div className={s.fieldsList}>
            <div className={s.fieldsRow}>
              <TitledInput
                  title='Контактное лицо (ФИО)'
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
            </div>
            <div className={s.fieldsRow}>
              <TitledInput
                  title='Номер телефона'
                  disabled
                  value={user.phone}
                />
              <TitledInput
                  title='Почта'
                  value={mail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setMail(e.target.value)}
                />
            </div>
          </div>
          <div className={s.fieldsList}>
            <div className={s.fieldsRow}>
              <TitledInput
                  title='Адрес доставки'
                  value={address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                />
              <TitledInput
                  title='Квартира / Офис'
                  value={flat}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFlat(e.target.value)}
                />
            </div>
            <div className={s.fieldsRow}>
              <TitledInput
                  title='Подъезд'
                  value={building}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setBuilding(e.target.value)}
                />
              <TitledInput
                  title='Этаж'
                  value={floor}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFloor(e.target.value)}
                />
            </div>
            <div className={s.fieldsRow}>
              <TitledInput
                  title='Домофон'
                  value={intercom}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setIntercom(e.target.value)}
                />
              <TitledInput
                  title='Комментарий'
                  value={comment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                />
            </div>
          </div>
          <button className={s.pay}>Оплатить — {userTotal.toLocaleString('ru-RU')} ₽</button>
        </div>
        <div className={s.orderDetails}>
          <div className={s.cartItemsList}>
            {cart.map((item) => (
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
                      {(item.product.price).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
                <p className={s.itemPrice}>
                {item.count} x <span>{(item.product.price * item.count).toLocaleString('ru-RU')} ₽</span>
                </p>
              </article>))
            }
          </div>
          <div className={s.detailsInfoList}>
            <div className={s.detailsRow}>
              <p className={s.detailsRowTitle}>Сумма товаров</p>
              <p className={s.detailsRowValue}>{cartTotal.toLocaleString('ru-RU')} ₽</p>
            </div>
            {
              (user.discount && user.discount > 0) ?
              <div className={s.detailsRow}>
                <p className={s.detailsRowTitle}>Персональная скидка {user.discount}%</p>
                <p className={s.detailsRowValue}>{(cartTotal * (user.discount / 100)).toLocaleString('ru-RU')} ₽</p>
              </div>
              : ''
            }
          </div>
          <div className={s.detailsInfoList}>
            <div className={s.detailsRow}>
              <p className={s.detailsRowTitle}>Итого</p>
              <p className={s.detailsRowValue}>{userTotal.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
