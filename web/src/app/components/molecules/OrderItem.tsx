import {
  Box,
  Button,
  Flex,
  Spacer,
  VStack,
  useDisclosure,
  useToast,
  HStack,
} from '@chakra-ui/react';

import {
  Order,
  OrderStatus,
  updateOrderStatus,
} from '@/app/redux/slices/ordersSlice';
import { useCallback, useState } from 'react';
import { SelectInput } from '../atoms/SelectInput';
import { ConfirmationModal } from '../atoms/ConfirmationModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';

const OrderStatusOptions: { [key in keyof typeof OrderStatus]: string } = {
  CANCELLED: 'Cancelado',
  DELIVERED: 'Entregue',
  PENDING: 'Pendente',
  PROCESSING: 'Processando',
  RETURNED: 'Devolvido',
  SHIPPED: 'Enviado',
};

interface OrderItemProps {
  order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const handleUpdateStatus = useCallback(() => {
    dispatch(
      updateOrderStatus({ orderId: order.id, newStatus: selectedStatus })
    )
      .unwrap()
      .then(() =>
        toast({
          title: 'Status atualizado com sucesso',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      )
      .catch(() =>
        toast({
          title: 'Erro ao atualizar status',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      );
  }, [dispatch, order.id, selectedStatus, toast]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value as OrderStatus);
  };

  return (
    <HStack
      p={4}
      borderWidth='1px'
      borderRadius='lg'
      spacing={20}
      w='800px'
      maxW='100%'
      mb={4}
    >
      <VStack justifyContent='flex-start' alignItems='flex-start'>
        <div>
          <strong>Nome:</strong> {order.name}
        </div>
        <div>
          <strong>Endereço:</strong> {order.address}
        </div>
        <div>
          <strong>Status:</strong> {OrderStatusOptions[order.status]}
        </div>
      </VStack>
      <Spacer />
      <VStack flex={1} alignItems='flex-start' w='100%'>
        <SelectInput
          options={Object.values(OrderStatus).map((status) => ({
            value: status,
            label: OrderStatusOptions[status],
          }))}
          defaultValue={order.status}
          onChange={handleStatusChange}
        />
        <Button onClick={onOpen}>Atualize o Status</Button>

        <ConfirmationModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={() => {
            handleUpdateStatus();
            onClose();
          }}
          title='Confirmar Atualização'
        >
          Tem certeza de que deseja atualizar o status deste pedido para{' '}
          {OrderStatusOptions[selectedStatus]}?
        </ConfirmationModal>
      </VStack>
    </HStack>
  );
};
