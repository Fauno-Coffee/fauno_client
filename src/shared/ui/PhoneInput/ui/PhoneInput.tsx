import './PhoneInput.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface IPhoneInput {
  value: string | undefined;
  onChange: (phone: string) => void;
  className?: string;
}

export const CustomPhoneInput = ({ value, onChange, className }: IPhoneInput) => {
  return (
    <PhoneInput
      international
      autoComplete='no'
      defaultCountry='RU'
      value={value}
      // @ts-ignore
      onChange={onChange}
    />
  );
};
