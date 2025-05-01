import s from './ProfileBgCard.module.css';

import { FC, ReactNode } from 'react';

interface IProfileBgCardProps {
  title: string;
  subTitle?: string;
  children?: ReactNode;
}

export const ProfileBgCard: FC<IProfileBgCardProps> = ({ title, subTitle, children }) => {
  return (
    <div className={s.card_wrapper}>
      <div className={s.heading}>
        <span className={s.title}>{title}</span>
        {subTitle && <span className={s.subTitle}>{subTitle}</span>}
      </div>
      {children}
    </div>
  );
};
