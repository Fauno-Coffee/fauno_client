import { FC } from 'react';
import { IIcon } from '@/shared/assets/types';

export const LightArrow: FC<IIcon> = ({ color }) => {
  return (
    <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L3.48599 4.68778C7.79172 11.075 13.8831 16.0528 21 19V19V19C13.8831 21.9472 7.79172 26.925 3.48599 33.3122L1 37" stroke={color || '#F4F2E4'} strokeWidth="2"/>
    </svg>
  );
};
