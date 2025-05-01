'use client';

import s from './Profile.module.css';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { ProfileContacts } from '@/components/Profile/ProfileContacts';
import { ProfileSale } from '@/components/Profile/ProfileSale';

export const Profile = () => {
  const { user } = useUserStore(state => state);

  return (
    <div className={s.profile_wrapper}>
      <div className={s.username}>
        <span>{user?.name || 'Заполните Ваш профиль'}</span>
      </div>
      <div className={s.cards_wrapper}>
        <ProfileSale />

        <ProfileContacts />
      </div>
    </div>
  );
};
