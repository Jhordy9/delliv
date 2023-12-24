import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

type InputPropsType = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & InputProps;

export const Input: React.FC<InputPropsType> = ({
  type,
  placeholder,
  value,
  onChange,
  ...props
}) => (
  <ChakraInput
    {...props}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
