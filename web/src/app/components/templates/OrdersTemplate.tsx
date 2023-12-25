import { Box, Heading, VStack } from '@chakra-ui/react';
import { Order, OrderStatus } from '@/app/redux/slices/ordersSlice';
import { OrderItem } from '../molecules/OrderItem';

interface OrdersTemplateProps {
  orders: Order[];
}

export const OrdersTemplate: React.FC<OrdersTemplateProps> = ({ orders }) => (
  <VStack align='center'>
    <Heading mb={4} mt={4}>
      Orders
    </Heading>
    {orders.map((order) => (
      <OrderItem key={order.id} order={order} />
    ))}
  </VStack>
);
