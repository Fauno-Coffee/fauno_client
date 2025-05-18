import { FC } from 'react';
import { IIcon } from '@/shared/assets/types';

export const AddToCartIcon: FC<IIcon> = ({ color }) => {
  return (
    <svg width='28' height='28' viewBox='0 0 33 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clip-path='url(#clip0_721_3383)'>
        <path
          d='M11.1699 25.2734C12.2661 25.2736 13.1543 26.1625 13.1543 27.2588C13.1541 28.3549 12.266 29.243 11.1699 29.2432C10.0737 29.2432 9.18477 28.355 9.18457 27.2588C9.18457 26.1624 10.0735 25.2734 11.1699 25.2734Z'
          stroke='#F4F2E4'
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M24.2051 25.2734C25.3013 25.2736 26.1895 26.1625 26.1895 27.2588C26.1893 28.3549 25.3012 29.243 24.2051 29.2432C23.1088 29.2432 22.2199 28.355 22.2197 27.2588C22.2197 26.1624 23.1087 25.2734 24.2051 25.2734Z'
          stroke='#F4F2E4'
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1.68359 5.92578H6.42433L7.6104 11.8517M7.6104 11.8517L9.60063 21.7954C9.70901 22.3411 10.0059 22.8312 10.4392 23.1801C10.8726 23.5289 11.4148 23.7142 11.971 23.7036H23.491C24.0472 23.7142 24.5895 23.5289 25.0228 23.1801C25.4561 22.8312 25.753 22.3411 25.8614 21.7954L27.1285 16.1511M7.6104 11.8517H21'
          stroke='#F4F2E4'
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M25.5 1V12M20 6.5H31' stroke='#F4F2E4' stroke-width='1.6' stroke-linecap='round' />
      </g>
      <defs>
        <clipPath id='clip0_721_3383'>
          <rect width='32' height='32' fill='white' transform='translate(0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
};
