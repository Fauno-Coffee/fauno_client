'use client';
import { useCartStore } from '@/shared/store/CartStoreProvider';
import s from './Order.module.css';
import Image from 'next/image';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { TitledInput } from '@/shared/ui/TitledInput';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

export const Order = () => {

  const { cart } = useCartStore((state) => state);
  const { user } = useUserStore((state) => state);

  const [mail, setMail] = useState(user.mail || "")
  const [name, setName] = useState(user.name || "")

  useEffect(() => {
    setMail(user.mail || "")
    setName(user.name || "")
  }, [user])

  const [orderType, setOrderType] = useState<number>(0)
  
  const [officeId, setOfficeId] = useState("")
  const [officeName, setOfficeName] = useState("")
  const [officeSearch, setOfficeSearch] = useState<[{code: string, name: string}]>()
  const [offices, setOffices] = useState<[{code: string, name: string}]>()
  
  const [selectedDelivery, setSelectedDelivery] = useState<any>()
  const [deliveryOptions, setDeliveryOptions] = useState<any>()
  
  const [city, setCity] = useState("")
  const [cityId, setCityId] = useState<number>()
  const [citySearch, setCitySearch] = useState<[{full_name: string, code: number}]>()
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
        window.location.href = `/profile`;
      },
      onComplete: (paymentResult: any) => {
        console.log('Платёж завершён:', paymentResult);
      }
    });
  };

  const cdekOfficeHandler = async (cityId: number) => {
    const url = `/order/office?cityCode=${cityId}`;
    const res = await fetch(apiUrlBuilder(url));
    const data = await res.json();
    setOffices(data)
  }
  
  const cdekTariffsHandler = async (cityId: number) => {
    const weights = cart.map((p) => p.product.weight * p.count) 
    const weight = weights.reduce((prev, curr) => prev + curr, 0);
    const url = `/order/tariffs?cityCode=${cityId}&weight=${weight}`;
    const res = await fetch(apiUrlBuilder(url));
    const data = await res.json();

    if(data && data.tariff_codes){
      const pvzDoor = data.tariff_codes.filter((tariff: any) => tariff.tariff_name.includes("склад-дверь") && !tariff.tariff_name.includes("маркетплейс"))
      const pvzpvs = data.tariff_codes.filter((tariff: any) => tariff.tariff_name.includes("склад-склад") && !tariff.tariff_name.includes("маркетплейс"))
      pvzDoor.sort(function(a: any, b: any) {
        return parseFloat(a.delivery_sum) - parseFloat(b.delivery_sum);
      })
      pvzpvs.sort(function(a: any, b: any) {
        return parseFloat(a.delivery_sum) - parseFloat(b.delivery_sum);
      })

      const deliveryOptions = []

      if(pvzDoor.length > 0){
        deliveryOptions.push({
          name: "CDEK до двери",
          days: pvzDoor[0].period_min,
          price: pvzDoor[0].delivery_sum,
          isDoor: true,
        })
      }

      if(pvzpvs.length > 0){
        deliveryOptions.push({
          name: "CDEK до пункта выдачи",
          days: pvzpvs[0].period_min,
          price: pvzpvs[0].delivery_sum,
          isDoor: false,
        })
      }

      setDeliveryOptions(deliveryOptions)
    }
    console.log(data)
  }

  const faunoDeliveryOptions = [
    {
      name: "Курьером по Москве (центр)",
      days: 1,
      price: 450,
      isDoor: true,
    },
    {
      name: "Доставка курьером (в пределах МКАД)",
      days: 1,
      price: 500,
      isDoor: true,
    }
  ]
  
  useEffect(() => {
    if(cityId){
      cdekOfficeHandler(cityId)
      cdekTariffsHandler(cityId)
    }
  }, [cityId])

  const cdekCityHandler = async (str: string) => {
    const url = `/order/city?name=${str}`;
    const res = await fetch(apiUrlBuilder(url));
    const data = await res.json();
    setCitySearch(data)
  }

  const searchCityHandler = async (str: string) => {
    setCity(str)
    if(str.length > 0){
      cdekCityHandler(str)
    } else {
      setCitySearch(undefined)
    }
  }
 
  const searchOfficeHandler = async (str: string) => {
    setOfficeName(str)

    const options = {
      keys: ['name'],
      threshold: 0.4,
    };
    
    if(offices && str.length > 0){
      const fuse = new Fuse(offices, options);
      const results = fuse.search(str);
      console.log(results)
      setOfficeSearch(results.map(res => res.item) as any)
    }
    // if(str.length > 0){
    //   cdekCityHandler(str)
    // } else {
    //   setCitySearch(undefined)
    // }
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
              <div className={s.cityInput}>
                <TitledInput
                  autoComplete='none'
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  title='Город'
                  value={city}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => searchCityHandler(e.target.value)}
                />
                {
                  citySearch && citySearch.length > 0 &&
                    <div className={s.search_results}>
                        <div className={s.outside_click_handler} onClick={() => setCitySearch(undefined)}></div>
                      {
                        citySearch.map((element, index) =>
                          <div className={s.search_result} key={index} onClick={() => {
                            setCitySearch(undefined); setCity(element.full_name); setCityId(element.code)
                          }}>
                            <p className={s.search_name} >{element.full_name.split(',').slice(0,2).join(',')}</p>
                          </div>
                        )
                      }
                    </div>
                }
              </div>
              {
                deliveryOptions && deliveryOptions.length ? 
                  <div className={s.deliveryList}>
                    <p className={s.deliveryType}>Выберите способ доставки</p>
                    {
                      deliveryOptions.map((option: any, index: any) => {
                        return(
                          <div className={`${s.delivery} ${option.name === selectedDelivery?.name ? s.selected : ""}`} key={index}
                            onClick={() => {setSelectedDelivery(option)}} 
                          >
                            {option.name}, {option.price}₽
                          </div>
                        )
                      })
                    }
                    {
                      cityId === 44 && faunoDeliveryOptions.map((option, index) => {
                        return(
                          <div className={`${s.delivery} ${option.name === selectedDelivery?.name ? s.selected : ""}`} key={index}
                            onClick={() => {setSelectedDelivery(option)}} 
                          >
                            {option.name}, {option.price}₽
                          </div>
                        )
                      })
                    }
                  </div>
                : <></>
              }
            {
              (selectedDelivery && selectedDelivery.isDoor) ? 
                <div className={s.fieldsRow}>
                  <TitledInput
                      title='Адрес доставки (улица, дом)'
                      value={address}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                    />
                  <TitledInput
                      title='Квартира / Офис'
                      value={flat}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFlat(e.target.value)}
                    />
                </div>
              : <></>
            }
            {
              (selectedDelivery && selectedDelivery.isDoor) ? 
                <div className={s.fieldsRow}>
                  <TitledInput
                      title='Адрес доставки (улица, дом)'
                      value={address}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                    />
                  <TitledInput
                      title='Квартира / Офис'
                      value={flat}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setFlat(e.target.value)}
                    />
                </div>
              : selectedDelivery ? 
                <div className={s.cityInput}>
                  <TitledInput
                    autoComplete='none'
                    onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                    title='Пункт выдачи CDEK'
                    value={officeName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => searchOfficeHandler(e.target.value)}
                  />
                  {
                    officeSearch && officeSearch.length > 0 &&
                      <div className={s.search_results}>
                          <div className={s.outside_click_handler} onClick={() => setOfficeSearch(undefined)}></div>
                        {
                          officeSearch.map((element, index) =>
                            <div className={s.search_result} key={index} onClick={() => {
                              setOfficeSearch(undefined); setOfficeName(element.name); setOfficeId(element.code)
                            }}>
                              <p className={s.search_name} >{element.name}</p>
                            </div>
                          )
                        }
                      </div>
                  }
                </div>
              : <></>
            }
            {
              (selectedDelivery && selectedDelivery.isDoor) ? 
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
                <TitledInput
                    title='Домофон'
                    value={intercom}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setIntercom(e.target.value)}
                  />
              </div>
              : <></>
            }
              
            <TitledInput
                title='Комментарий'
                value={comment}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
              />
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
