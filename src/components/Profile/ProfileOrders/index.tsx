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

  return (
    <ProfileBgCard title='История заказов'>
      {
        orders && orders.map((order) => {
          return(<div key={order.id} >
            {order.sum}
          </div>)
        })
      } 
    </ProfileBgCard>
  );
};
