import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <Flex
      as='header'
      width='full'
      align='center'
      justifyContent='center'
      p={4}
      bg='blue.900'
    >
      <Heading as='h1' size='lg' color='white'>
        Delliv
      </Heading>
    </Flex>
  );
};
