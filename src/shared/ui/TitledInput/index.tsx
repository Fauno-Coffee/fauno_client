import s from './TitledInput.module.css';
import { FC, HTMLProps } from 'react';

interface ITitledInputProps extends HTMLProps<HTMLInputElement> {
  title: string;
}

export const TitledInput: FC<ITitledInputProps> = ({ title, ...props }) => {
  return (
    <div className={s.wrapper}>
      <span className={s.title}>{title}</span>
      <input {...props} className={s.titled_input}></input>
    </div>
  );
};
