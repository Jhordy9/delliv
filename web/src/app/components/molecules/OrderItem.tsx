import { Box, Button, Flex, Spacer } from '@chakra-ui/react';

import { Order, OrderStatus } from '@/app/redux/slices/ordersSlice';
import { useState } from 'react';
import { SelectInput } from '../atoms/SelectInput';
import { StatusLabel } from '../atoms/StatusLabel';

interface OrderItemProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  order,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as OrderStatus);
  };

  return (
    <Box p={4} borderWidth='1px' borderRadius='lg' mb={4}>
      <Flex align='center'>
        <Box flex='1'>
          <div>
            <strong>Nome:</strong> {order.name}
          </div>
          <div>
            <strong>Endereço:</strong> {order.address}
          </div>
        </Box>
        <Spacer />
        <Box flex='1'>
          <StatusLabel status={order.status} />
          <SelectInput
            options={Object.values(OrderStatus).map((status) => ({
              value: status,
              label: status,
            }))}
            onChange={handleStatusChange}
          />
          <Button onClick={() => onUpdateStatus(order.id, selectedStatus)}>
            Update Status
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
