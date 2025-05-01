import s from './ProfileContacts.module.css';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { TitledInput } from '@/shared/ui/TitledInput';
import { ProfileBgCard } from '@/components/Profile/ProfileBgCard';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import axios from 'axios';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';

export const ProfileContacts: FC = () => {
  const { token, user, setUser } = useUserStore(state => state);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [mail, setMail] = useState(user?.mail || '');

  useEffect(() => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
    setMail(user?.mail || '');
  }, [user?.id]);

  const onSubmitContacts = async () => {
    try {
      const url = `/user`;
      const res = await axios.put(
        apiUrlBuilder(url),
        {
          name,
          phone,
          mail,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.status === 200 && res.data?.user?.id) {
        setUser(token, res.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileBgCard title='Контактные данные'>
      <div className={s.contacts_wrapper}>
        <TitledInput
          title='Имя'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <TitledInput
          title='Телефон'
          value={phone}
          type='phone'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
        />
        <TitledInput
          title='Email'
          value={mail}
          type='email'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMail(e.target.value)}
        />
        <button className={s.submit_button} onClick={onSubmitContacts}>
          Обновить
        </button>
      </div>
    </ProfileBgCard>
  );
};
