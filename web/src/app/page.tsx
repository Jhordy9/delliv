'use client';
import React from 'react';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import { LoginForm } from '@/app/components/molecules/Login';
import { Header } from '@/app/components/molecules/Header';

const LoginPage: React.FC = () => {
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
