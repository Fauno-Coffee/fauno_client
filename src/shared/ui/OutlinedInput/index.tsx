import s from './OutlinedInput.module.css';
import { FC, HTMLProps } from 'react';

interface IOutlinedInputProps extends HTMLProps<HTMLInputElement> {}

export const OutlinedInput: FC<IOutlinedInputProps> = ({ ...props }) => {
  return <input {...props} className={s.outlined_input}></input>;
};
