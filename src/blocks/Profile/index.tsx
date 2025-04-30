'use client';

import s from './Profile.module.css';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';

export const Profile = () => {
  const { user } = useUserStore(state => state);

  return (
    <div className={s.profile_wrapper}>
      <div className={s.username}>
        <span>{user?.name || 'Заполните Ваш профиль'}</span>
      </div>
    </div>
  );
};
