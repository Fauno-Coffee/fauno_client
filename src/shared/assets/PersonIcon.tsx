import { FC } from 'react';
import { IIcon } from '@/shared/assets/types';

export const PersonIcon: FC<IIcon> = ({ color }) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='11.9141' cy='8.72243' r='4.28125' stroke={color || '#F4F2E4'} />
      <path
        d='M10.572 13.4627H13.2639C14.9303 13.4627 16.3704 14.6262 16.7206 16.2553L17.2756 18.8377H6.5603L7.11538 16.2553C7.46555 14.6262 8.90567 13.4627 10.572 13.4627Z'
        stroke={color || '#F4F2E4'}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
