'use client';
import { useEffect, useState, useMemo, useCallback, ChangeEvent } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Fuse from 'fuse.js';

import { useCartStore } from '@/shared/store/CartStoreProvider';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { TitledInput } from '@/shared/ui/TitledInput';
import s from './Order.module.css';
import { normalizeCountForm } from '@/shared/utils/normalizeCountForm';
import { CitySearch } from './citySearch';
import { toast } from 'react-toastify';

interface ICDEKCity {
  full_name: string;
  code: number;
}

interface ICDEKOffice {
  name: string;
  code: string;
}

interface IBOXBERRYOffice {
  Name: string;
  Code: string;
}

interface IDelivery {
  name: string;
  days?: number;
  price?: number;
  addressRequired: boolean;
  cdekId?: number;
  cdekOfficeRequired: boolean;
  comment?: string;
  boxberryOfficeRequired: boolean;
}

interface IForm {
  name: string;
  mail: string;
  city: string;
  cityId: number | undefined;
  boxberryCityId: number | undefined;
  selectedDelivery: IDelivery | undefined;
  officeName: string;
  boxberryOfficeName: string;
  officeId: string;
  boxberryOfficeId: string;
  address: string;
  flat: string;
  building: string;
  floor: string;
  intercom: string;
  comment: string;
}

const FAUNO_OPTIONS: IDelivery[] = [
  {
    name: 'Курьером по Москве (центр)',
    days: 1,
    price: 450,
    addressRequired: true,
    cdekOfficeRequired: false,
    boxberryOfficeRequired: false
  },
  {
    name: 'Доставка курьером (в пределах МКАД)',
    days: 1,
    price: 500,
    addressRequired: true,
    cdekOfficeRequired: false,
    boxberryOfficeRequired: false
  },
  {
    name: 'Самовывоз из кофейни fauno (ул. Самокатная 3, стр.13)',
    addressRequired: false,
    cdekOfficeRequired: false,
    boxberryOfficeRequired: false
  },
  {
    name: 'Доставка курьером Яндекс, день в день',
    price: 1200,
    addressRequired: true,
    cdekOfficeRequired: false,
    boxberryOfficeRequired: false
  },
];

export const Order = () => {
  const { cart } = useCartStore(state => state);
  const { user } = useUserStore(state => state);

  // Form state
  const [form, setForm] = useState<IForm>({
    name: user.name || '',
    mail: user.mail || '',
    city: '',
    boxberryCityId: undefined,
    cityId: undefined,
    selectedDelivery: undefined,
    boxberryOfficeId: '',
    officeName: '',
    boxberryOfficeName: '',
    officeId: '',
    address: '',
    flat: '',
    building: '',
    floor: '',
    intercom: '',
    comment: '',
  });

  // Synchronized user defaults
  useEffect(() => {
    setForm(f => ({ ...f, name: user.name || '', mail: user.mail || '' }));
  }, [user.name, user.mail]);

  // Cart totals
  const cartTotal = useMemo(
    () => cart.reduce((sum, { product, count }) => sum + product.price * count, 0),
    [cart],
  );
  const userTotal = useMemo(() => {
    let base =
      user.discount && user.discount > 0 ? cartTotal * (1 - user.discount / 100) : cartTotal;

    if (form.selectedDelivery) {
      base += form.selectedDelivery.price || 0;
    }

    return base;
  }, [cartTotal, user.discount, form.selectedDelivery]);

  // City search
  const [cityOptions, setCityOptions] = useState<ICDEKCity[]>([]);

  // CDEK data
  const [offices, setOffices] = useState([]);
  const [boxberryOffices, setBoxberryOffices] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState<IDelivery[]>([]);

  useEffect(() => {
    const loadCdek = async () => {
      if (!form.cityId) return;

      // Fetch offices
      const officeRes = await fetch(apiUrlBuilder(`/order/office?cityCode=${form.cityId}&cityName=${form.city.split(',')[0]}`));
      const responce = await officeRes.json()
      setOffices(responce['offecies']);
      setBoxberryOffices(responce['boxberryOffices']);
      setForm(f => ({ ...f, boxberryCityId: responce['boxberryCityId'] }));


      // Fetch tariffs
      const weight = cart.reduce((sum, { product, count }) => sum + product.weight * count, 0);
      const tariffRes = await fetch(
        apiUrlBuilder(`/order/tariffs?cityCode=${form.cityId}&boxberryCityId=${responce['boxberryCityId']}&weight=${weight}`),
      );

      const data = await tariffRes.json();
      const options = [...data, ...(form.cityId === 44 ? FAUNO_OPTIONS : [])];

      setDeliveryOptions(options);
    };
    loadCdek();
  }, [form.cityId, cart]);

  // Office search
  const [officeOptions, setOfficeOptions] = useState<ICDEKOffice[]>([]);
  const searchOffice = useCallback(
    (str: string) => {
      setForm(f => ({ ...f, officeName: str }));
      if (!str) return setOfficeOptions([]);
      const fuse = new Fuse(offices, { keys: ['name'], threshold: 0.4 });
      setOfficeOptions(fuse.search(str).map(r => r.item));
    },
    [offices],
  );
  
  const [boxberryOfficeOptions, setBoxberryOfficeOptions] = useState<IBOXBERRYOffice[]>([]);
  const searchBoxberryOffice = useCallback(
    (str: string) => {
      setForm(f => ({ ...f, boxberryOfficeName: str }));
      if (!str) return setBoxberryOfficeOptions([]);
      const fuse = new Fuse(boxberryOffices, { keys: ['Address'], threshold: 0.4 });
      setBoxberryOfficeOptions(fuse.search(str).map(r => r.item));
    },
    [offices],
  );
  
  
  // Handlers
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }, []);

  const handleSelectCity = (option: ICDEKCity) => {
    setForm(f => ({ ...f, city: option.full_name, cityId: option.code }));
    setCityOptions([]);
  };

  const handleSelectOffice = (option: ICDEKOffice) => {
    setForm(f => ({ ...f, officeName: option.name, officeId: option.code }));
    setOfficeOptions([]);
  };

  const handleSelectBoxberryOffice = (option: IBOXBERRYOffice) => {
    setForm(f => ({ ...f, boxberryOfficeName: option.Name, boxberryOfficeId: option.Code }));
    setBoxberryOfficeOptions([]);
  };

  // Payment
  const handlePay = async () => {
    if (!form.name || !form.mail) {
      return toast.error('Заполните обязательные поля');
    }

    if (!form.city) {
      return toast.error('Введите город');
    }

    if (!form.cityId) {
      return toast.error('Выберите город из списка');
    }

    if (!form.selectedDelivery) {
      return toast.error('Выберите способ доставки');
    }

    if (form.selectedDelivery.cdekOfficeRequired && !form.officeId) {
      return toast.error('Выберите пункт выдачи CDEK');
    }
    
    if (form.selectedDelivery.boxberryOfficeRequired && !form.boxberryOfficeId) {
      return toast.error('Выберите пункт выдачи CDEK');
    }

    if (form.selectedDelivery.addressRequired) {
      if (!form.address) {
        return toast.error('Укажите адрес доставки');
      }
    }

    const { data } = await axios.post(apiUrlBuilder('/order'), {
      ...form,
      userId: user.id,
      phone: user.phone,
      products: cart.map(p => ({
        productId: p.product.id,
        count: p.count,
        selectorValue: p.selectorValue,
      })),
    });

    const { invoiceId, amount, currency } = data;
    const widget = new (window as any).cp.CloudPayments();
    widget.pay(
      'charge',
      {
        publicId: process.env.NEXT_PUBLIC_CP_PUBLIC_ID,
        description: `Заказ №${invoiceId}`,
        amount,
        currency,
        invoiceId,
        accountId: user.id,
        data: { orderId: invoiceId },
      },
      {
        onSuccess: () => {
          window.location.href = '/profile';
        },
        onComplete: (res: string) => console.log('Платёж завершён:', res),
      },
    );
  };

  return (
    <div className={s.blockWrapper}>
      <p className={s.title}>Оформление заказа</p>
      <div className={s.order_wrapper}>
        <div className={s.orderInfo}>
          {/* Контакты */}
          <div className={s.fieldsList}>
            <TitledInput
              title='ФИО'
              required
              name='name'
              value={form.name}
              onChange={handleChange}
            />
            <div className={s.fieldsRow}>
              <TitledInput title='Телефон' required disabled value={user.phone} />
              <TitledInput
                title='Почта'
                required
                name='mail'
                value={form.mail}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Город */}
          <div className={s.cityInput}>
            <CitySearch
              city={form.city}
              cityId={form.cityId}
              setCityOptions={setCityOptions}
              setForm={setForm}
            />
            {cityOptions.length > 0 && (
              <div className={s.search_results}>
                <div className={s.outside_click_handler} onClick={() => setCityOptions([])} />
                {cityOptions.map(o => (
                  <div key={o.code} className={s.search_result} onClick={() => handleSelectCity(o)}>
                    <p className={s.search_name}>{o.full_name.split(',').slice(0, 2).join(',')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Способы доставки */}
          {deliveryOptions.length > 0 && (
            <div className={s.deliveryList}>
              <p className={s.deliveryType}>Выберите способ доставки</p>
              {deliveryOptions.map(opt => (
                <div
                  key={opt.name}
                  className={`${s.delivery} ${opt.name === form.selectedDelivery?.name ? s.selected : ''}`}
                  onClick={() => setForm(f => ({ ...f, selectedDelivery: opt }))}
                >
                  {opt.name}
                  {opt.days
                    ? `, от ${opt.days} ${normalizeCountForm(opt.days, ['дня', 'дней', 'дней'])}`
                    : ''}
                  {opt.price ? `, ${opt.price} ₽` : ''}
                  {opt.comment ? `, ${opt.comment}` : ''}
                </div>
              ))}
            </div>
          )}
          {/* Адрес или пункт выдачи */}
          {form.selectedDelivery?.addressRequired && (
            <>
              <TitledInput
                title='Адрес (улица, дом)'
                required
                name='address'
                value={form.address}
                onChange={handleChange}
              />
              <TitledInput title='Кв./офис' name='flat' value={form.flat} onChange={handleChange} />
              <div className={s.fieldsRow}>
                <TitledInput
                  title='Подъезд'
                  name='building'
                  value={form.building}
                  onChange={handleChange}
                />
                <TitledInput title='Этаж' name='floor' value={form.floor} onChange={handleChange} />
                <TitledInput
                  title='Домофон'
                  name='intercom'
                  value={form.intercom}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {form.selectedDelivery?.cdekOfficeRequired && (
            <div className={s.cityInput}>
              <TitledInput
                autoComplete='none'
                required
                onFocus={e => e.target.setAttribute('autoComplete', 'none')}
                title='Пункт выдачи CDEK'
                name='officeName'
                value={form.officeName}
                onChange={(e: any) => searchOffice(e.target.value)}
              />
              {officeOptions.length > 0 && (
                <div className={s.search_results}>
                  <div className={s.outside_click_handler} onClick={() => setOfficeOptions([])} />
                  {officeOptions.map(o => (
                    <div
                      key={o.code}
                      className={s.search_result}
                      onClick={() => handleSelectOffice(o)}
                    >
                      <p className={s.search_name}>{o.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {form.selectedDelivery?.boxberryOfficeRequired && (
            <div className={s.cityInput}>
              <TitledInput
                autoComplete='none'
                required
                onFocus={e => e.target.setAttribute('autoComplete', 'none')}
                title='Пункт выдачи Boxberry'
                name='boxberryOfficeName'
                value={form.boxberryOfficeName}
                onChange={(e: any) => searchBoxberryOffice(e.target.value)}
              />
              {boxberryOfficeOptions.length > 0 && (
                <div className={s.search_results}>
                  <div className={s.outside_click_handler} onClick={() => setBoxberryOfficeOptions([])} />
                  {boxberryOfficeOptions.map(o => (
                    <div
                      key={o.Code}
                      className={s.search_result}
                      onClick={() => handleSelectBoxberryOffice(o)}
                    >
                      <p className={s.search_name}>{o.Name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Комментарий */}
          <TitledInput
            title='Комментарий'
            name='comment'
            value={form.comment}
            onChange={handleChange}
          />
          {/* Суммы */}
          <div className={s.mobileDetailsInfoList}>
            <div className={s.detailsRow}>
              <p className={s.detailsRowTitle}>Сумма товаров</p>
              <p className={s.detailsRowValue}>{cartTotal.toLocaleString('ru-RU')} ₽</p>
            </div>
            {user.discount && user.discount > 0 ? (
              <div className={s.detailsRow}>
                <p className={s.detailsRowTitle}>Скидка {user.discount}%</p>
                <p className={s.detailsRowValue}>
                  {(cartTotal * (user.discount / 100)).toLocaleString('ru-RU')} ₽
                </p>
              </div>
            ) : (
              <></>
            )}
            {form.selectedDelivery && (
              <div className={s.detailsRow}>
                <p className={s.detailsRowTitle}>Доставка</p>
                <p className={s.detailsRowValue}>{form.selectedDelivery.price || 0} ₽</p>
              </div>
            )}
          </div>
          <div className={s.mobileDetailsInfoList}>
            <div className={s.detailsRow}>
              <p className={s.detailsRowTitle}>Итого</p>
              <p className={s.detailsRowValue}>{userTotal.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
          <button className={s.pay} onClick={handlePay}>
            Оплатить — {userTotal.toLocaleString('ru-RU')} ₽
          </button>
        </div>

        {/* Детали корзины */}
        <div className={s.orderDetails}>
          <div className={s.cartItemsList}>
            {cart.map(item => (
              <article key={item.id} className={s.cartItem}>
                <div className={s.imageInfo}>
                  <div className={s.imageWrapper}>
                    <Image
                      src={imageUrlBuilder(item.product.images[0].imageUrl)}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={s.itemInfo}>
                    <p className={s.itemName}>{item.product.name}</p>
                    <p className={s.itemPrice}>{item.product.price.toLocaleString('ru-RU')} ₽</p>
                    {item?.product?.selector && item.selectorValue && (
                      <p className={s.itemPrice}>
                        {item.product?.selector?.name} - {item.selectorValue}
                      </p>
                    )}
                  </div>
                </div>
                <p className={s.itemPrice}>
                  {item.count} x{' '}
                  <span>{(item.product.price * item.count).toLocaleString('ru-RU')} ₽</span>
                </p>
              </article>
            ))}
          </div>
          <div className={s.detailsInfoList}>
            <div className={s.detailsRow}>
              <p className={s.detailsRowTitle}>Сумма товаров</p>
              <p className={s.detailsRowValue}>{cartTotal.toLocaleString('ru-RU')} ₽</p>
            </div>
            {user.discount && user.discount > 0 ? (
              <div className={s.detailsRow}>
                <p className={s.detailsRowTitle}>Скидка {user.discount}%</p>
                <p className={s.detailsRowValue}>
                  -{(cartTotal * (user.discount / 100)).toLocaleString('ru-RU')} ₽
                </p>
              </div>
            ) : (
              <></>
            )}
            {form.selectedDelivery && (
              <div className={s.detailsRow}>
                <p className={s.detailsRowTitle}>Доставка</p>
                <p className={s.detailsRowValue}>{form.selectedDelivery.price || 0} ₽</p>
              </div>
            )}
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
