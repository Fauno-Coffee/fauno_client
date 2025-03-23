import s from './Button.module.css';
import { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className={s.button_outlined}>
      {children}
    </div>
  );
};
