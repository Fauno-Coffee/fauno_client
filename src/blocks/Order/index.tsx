'use client';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import s from './Order.module.css';
import Image from 'next/image';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { TitledInput } from '@/shared/ui/TitledInput';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

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

   const handlePay = async () => {
    // 1. Создаём заказ
    const url = `/order`;

    const response = await axios.post(apiUrlBuilder(url), {
        userId: user.id,
        name, phone: user.phone, mail, address, flat,
        building, floor, intercom, comment,
        products: cart.map(p=>({productId:p.product.id, count:p.count}))
    });

    // console.log(response)

    const { invoiceId, amount, currency } = response.data;
    const { cp } = window as any

    // // 2. Инициализируем виджет
    const widget = new cp.CloudPayments();
    widget.pay('charge', {
      publicId: process.env.NEXT_PUBLIC_CP_PUBLIC_ID,
      description: `Заказ №${invoiceId}`,
      amount,               // сумма заказа
      currency,             // валюта (RUB)
      invoiceId,            // номер заказа
      accountId: user?.id,  // ваш ID плательщика (опционально)
      data: { orderId: invoiceId }
    }, {
      onSuccess: () => {
        // например, редирект на страницу успешной оплаты
        window.location.href = `/success?orderId=${invoiceId}`;
      },
      onFail: () => {
        alert('Платёж не прошёл, попробуйте ещё раз');
      },
      onComplete: (paymentResult: any) => {
        console.log('Платёж завершён:', paymentResult);
      }
    });
  };

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
            <div>
              <div className={s.mobileDetailsInfoList}>
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
              <div className={s.mobileDetailsInfoList}>
                <div className={s.detailsRow}>
                  <p className={s.detailsRowTitle}>Итого</p>
                  <p className={s.detailsRowValue}>{userTotal.toLocaleString('ru-RU')} ₽</p>
                </div>
              </div>
            </div>
          </div>
          <button className={s.pay} onClick={handlePay}>Оплатить — {userTotal.toLocaleString('ru-RU')} ₽</button>
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
