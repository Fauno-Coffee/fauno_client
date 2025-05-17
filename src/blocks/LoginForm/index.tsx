'use client';

import s from './LoginForm.module.css';
import { FaunoHeaderLogo } from '@/shared/assets/FaunoHeaderLogo';
import { OutlinedInput } from '@/shared/ui';
import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { PhoneInput } from '@/shared/ui/PhoneInput';

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState(['', '', '', '']);

  const refInputCode = useRef<Array<HTMLInputElement>>([]);

  const [codeHasGenerated, setCodeHasGenerated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUserStore(state => state);

  const onSubmit = async () => {
    const url = `/user/login`;
    try {
      const res = await axios.post(apiUrlBuilder(url), { phone });
      if (res.status === 200 && res.data === phone) {
        setCodeHasGenerated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckCode = async (code: number) => {
    const url = `/user/login/sms`;
    try {
      const res = await axios.post(apiUrlBuilder(url), { phone, smsCode: code });
      if (res.status === 200 && !!res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.token, res.data.user);
        document.cookie = `token=${res.data.token}; path=/;`;
        router.push(searchParams?.get('backUrl') || '/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const codeDigitsHandler = (e: any) => {
    if (e.target.value.length > 1) {
      const startInputNumber = parseInt(e.target.name[e.target.name.length - 1]) - 1;
      let positionsToFill = startInputNumber + e.target.value.length;

      if (positionsToFill > 6) positionsToFill = 6;

      let newCode = structuredClone(smsCode);
      for (
        let i = startInputNumber, pastedValueIterator = 0;
        i < positionsToFill;
        i++, pastedValueIterator++
      ) {
        newCode[i] = e.target.value[pastedValueIterator];
      }
      setSmsCode(newCode);
    } else {
      const currentInputNumber = parseInt(e.target.name[e.target.name.length - 1]) - 1;
      let newCode = structuredClone(smsCode);
      newCode[currentInputNumber] = e.target.value;
      setSmsCode(newCode);
      if (e.target.value !== '' && currentInputNumber !== 3) {
        refInputCode.current[currentInputNumber + 1].focus();
      }
    }
  };

  useEffect(() => {
    const codeIsValid = smsCode.every(digit => !!digit);
    if (codeIsValid) {
      onCheckCode(+smsCode.join(''));
    }
  }, [smsCode]);

  return (
    <div className={s.form_wrapper}>
      <FaunoHeaderLogo fill='black' />
      {!codeHasGenerated ? (
        <>
          <PhoneInput value={phone} onChange={setPhone} />
          <button className={s.submit_button} onClick={onSubmit} disabled={isLoading}>
            Отправить код
          </button>
        </>
      ) : (
        <>
          <div className={s.info_wrapper}>
            <span className={s.title}>Введите код из SMS</span>
            <span className={s.subTitle}>Мы отправили SMS с кодом на телефон</span>
            <span className={s.phone}>{phone}</span>
            <span className={s.ya_napisal_ne_tot_nomer} onClick={() => setCodeHasGenerated(false)}>
              Изменить номер
            </span>
          </div>

          <div className={s.codeInputStack}>
            <OutlinedInput
              disabled={isLoading}
              name='code_1'
              style={CodeInputStyles}
              type='number'
              min={0}
              max={9}
              maxLength={1}
              value={smsCode[0]}
              ref={(e: any) => (refInputCode.current[0] = e)}
              onFocus={e => {
                e.target.select();
              }}
              onChange={e => {
                codeDigitsHandler(e);
              }}
            />
            <OutlinedInput
              disabled={isLoading}
              name='code_2'
              style={CodeInputStyles}
              type='number'
              min={0}
              max={9}
              maxLength={1}
              value={smsCode[1]}
              ref={(e: any) => (refInputCode.current[1] = e)}
              onFocus={e => {
                e.target.select();
              }}
              onChange={e => {
                codeDigitsHandler(e);
              }}
            />
            <OutlinedInput
              disabled={isLoading}
              name='code_3'
              style={CodeInputStyles}
              type='number'
              min={0}
              max={9}
              maxLength={1}
              value={smsCode[2]}
              ref={(e: any) => (refInputCode.current[2] = e)}
              onFocus={e => {
                e.target.select();
              }}
              onChange={e => {
                codeDigitsHandler(e);
              }}
            />
            <OutlinedInput
              disabled={isLoading}
              name='code_4'
              style={CodeInputStyles}
              type='number'
              min={0}
              max={9}
              maxLength={1}
              value={smsCode[3]}
              ref={(e: any) => (refInputCode.current[3] = e)}
              onFocus={e => {
                e.target.select();
              }}
              onChange={e => {
                codeDigitsHandler(e);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const CodeInputStyles: CSSProperties = {
  aspectRatio: 1,
  color: '#3C5F3B',
  fontWeight: 500,
  fontSize: '22px',
  textAlign: 'center',
};
