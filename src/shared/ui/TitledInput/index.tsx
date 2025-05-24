import s from './TitledInput.module.css';
import { FC, HTMLProps } from 'react';

interface ITitledInputProps extends HTMLProps<HTMLInputElement> {
  title: string;
  error?: string;
  required?: boolean;
}

export const TitledInput: FC<ITitledInputProps> = ({ title, error, required = false, ...props }) => {
  return (
    <div className={s.wrapper}>
      <span className={`${s.title} ${required ? s.required : ''}`}>{title}</span>
      <input {...props} className={s.titled_input}></input>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};
