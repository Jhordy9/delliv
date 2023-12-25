'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Spacer, VStack } from '@chakra-ui/react';
import { fetchOrders } from '../redux/slices/ordersSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Pagination } from '../components/molecules/Pagination';
import { OrdersTemplate } from '../components/templates/OrdersTemplate';
import { withAuth } from '../hooks/useAuth';
import { Header } from '../components/molecules/Header';

const OrdersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((state: RootState) => state.orders);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchOrders({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <VStack maxW='full'>
        <OrdersTemplate orders={selector?.orders ?? []} />
        {selector?.info && (
          <Pagination
            currentPage={currentPage}
            totalPages={selector?.info.total_pages}
            onPageChange={handlePageChange}
          />
        )}
      </VStack>
    </>
  );
};

export default withAuth(OrdersPage);
