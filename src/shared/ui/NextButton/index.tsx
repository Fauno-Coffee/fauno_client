import s from './NextButton.module.css';
import { FC } from 'react';
import { ArrowIcon } from '@/shared/assets';

interface INextButtonProps {
  outlined?: boolean;
  onClick?: () => void;
}

export const NextButton: FC<INextButtonProps> = ({ outlined, onClick }) => {
  if (outlined)
    return (
      <div onClick={onClick} className={s.button_outlined}>
        <ArrowIcon />
      </div>
    );
  if (!outlined)
    return (
      <div onClick={onClick} className={s.button}>
        <ArrowIcon />
      </div>
    );
};
