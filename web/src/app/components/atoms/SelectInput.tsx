import { Select } from '@chakra-ui/react';

type SelectInputProps = {
  options: Array<{ value: string; label: string }>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  options,
  onChange,
}) => (
  <Select onChange={onChange}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);
