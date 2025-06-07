'use client';

import s from './CookieWrapper.module.css';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Button } from '@/shared/ui';

export const ZakharCrumbleCookie: FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isAccepted = !!localStorage.getItem('cookieAlertAccepted');
    console.log(isAccepted);
    if (!isAccepted) setShow(true);
  }, []);

  const setAccept = () => {
    localStorage.setItem('cookieAlertAccepted', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className={s.wrapper}>
      <div className={s.cookie_modal}>
        <p>Мы используем Cookies</p>
        <button className={s.button} onClick={setAccept}>Понятно</button>
      </div>
    </div>
  );
};
