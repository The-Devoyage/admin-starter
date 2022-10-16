import { FC } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';

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
