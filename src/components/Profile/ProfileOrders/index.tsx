//@ts-nocheck
import s from './ProfileContacts.module.css';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { TitledInput } from '@/shared/ui/TitledInput';
import { ProfileBgCard } from '@/components/Profile/ProfileBgCard';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';

export const ProfileOrders: FC = () => {
  const { token, user } = useUserStore(state => state);

  const [orders, setOrders] = useState<Array<any>>();

    const getUserOrders = async () => {
    try {
      const url = `/user/orders`;
      const res = await fetch(apiUrlBuilder(url), { headers: { Authorization: `Bearer ${token}` } },);
      const data = await res.json();
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(token){
      getUserOrders()
    }
  }, [user?.id]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const ORDER_STATE_OPTIONS = {
      'pending': 'В обработке',
      'paid': 'Оплачен',
      'confirmed': 'Принят',
      'delivery': 'Передан в доставку',
      'delivered': 'Доставлен',
      'canceled': 'Отменён',
  };


  return (
    <ProfileBgCard title='История заказов'>
      <table style={{borderSpacing: 0}}>
        <thead>
          <tr>
            <td className={s.cell} style={{width: "25%"}}>Дата оформления</td>
            <td className={s.cell} style={{width: "25%"}}>Номер заказа</td>
            <td className={s.cell} style={{width: "25%"}}>Статус</td>
            <td className={s.cell} style={{width: "25%"}}>Сумма</td>
          </tr>
        </thead>
        <tbody>
          {
            orders && orders.map((order) => {
              return(
                <tr key={order.id}>
                  <td className={s.cell}>{new Date(order.createdAt).toLocaleDateString("ru-RU", options)}</td>
                  <td className={s.cell}>{order.id.split("-")[0]}</td>
                  <td className={s.cell}>{ORDER_STATE_OPTIONS[order.state]}</td>
                  <td className={s.cell}>{order.sum} ₽</td>
                </tr>
              )
            })
          } 
        </tbody>
      </table>
    </ProfileBgCard>
  );
};
