import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

type ButtonPropsType = {
  text?: string;
} & ButtonProps;

export const Button: React.FC<ButtonPropsType> = ({ text, ...props }) => (
  <ChakraButton {...props}>{text}</ChakraButton>
);
