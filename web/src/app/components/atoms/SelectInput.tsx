import { Select, SelectProps } from '@chakra-ui/react';

type SelectInputProps = {
  options: Array<{ value: string; label: string }>;
} & SelectProps;

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  ...props
}) => (
  <Select {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);
