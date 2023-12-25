import { Box, Heading } from '@chakra-ui/react';
import { Order, OrderStatus } from '@/app/redux/slices/ordersSlice';
import { OrderItem } from '../molecules/OrderItem';

interface OrdersTemplateProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrdersTemplate: React.FC<OrdersTemplateProps> = ({
  orders,
  onUpdateStatus,
}) => (
  <Box maxW='container.xl' mx='auto' px={4} py={6}>
    <Heading mb={6}>Orders</Heading>
    {orders.map((order) => (
      <OrderItem key={order.id} order={order} onUpdateStatus={onUpdateStatus} />
    ))}
  </Box>
);
