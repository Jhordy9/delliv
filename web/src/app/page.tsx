'use client';
import { Box, Container, VStack } from '@chakra-ui/react';
import { LoginForm } from '@/app/components/molecules/Login';
import { Header } from '@/app/components/molecules/Header';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated
  );
  const router = useRouter();

  if (isAuthenticated) router.push('/orders');

  return (
    <Box>
      <Header />
      <Container centerContent>
        <Box w='100%' maxW='md' p={4} mt={8}>
          <VStack spacing={8} align='stretch'>
            <LoginForm />
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
