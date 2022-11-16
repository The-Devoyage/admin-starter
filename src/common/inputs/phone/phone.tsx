import { FC } from 'react';
import PI, { PhoneInputProps } from 'react-phone-input-2';

// eslint-disable-next-line
const PhoneInput = import.meta.env.PROD ? (PI as any).default : PI;

interface IPhoneInputProps extends PhoneInputProps {
  invalid?: boolean;
}

export const Phone: FC<IPhoneInputProps> = ({ invalid, ...props }) => (
  <PhoneInput
    {...props}
    specialLabel=""
    country="us"
    placeholder="555-555-5555"
    inputStyle={{ border: invalid ? '1px solid red' : '' }}
  />
);
