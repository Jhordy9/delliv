import { Text } from '@chakra-ui/react';

type StatusLabelProps = {
  status: string;
};

export const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => (
  <Text color='blue.500'>{status}</Text>
);
