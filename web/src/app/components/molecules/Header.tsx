import React from 'react';
import { HStack, Heading } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/redux/slices/authSlice';
import { Button } from '../atoms/Button';
import { usePathname, useRouter } from 'next/navigation';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <HStack
      as='header'
      w='full'
      align='center'
      justifyContent='space-evenly'
      p={4}
      bg='blue.900'
    >
      <Heading as='h1' size='lg' color='white' textAlign='center'>
        Delliv
      </Heading>
      {pathname === '/orders' && (
        <Button onClick={handleLogout} colorScheme='red' text='Logout' />
      )}
    </HStack>
  );
};
