import { Flex, Text } from '@chakra-ui/react';
import { Button } from '../atoms/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Flex justifyContent='flex-end' alignItems='center' h='auto' mb={5}>
      <Button
        size='xs'
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
        leftIcon={<ChevronLeftIcon boxSize={5} />}
        iconSpacing={0}
      >
        Anterior
      </Button>
      <Text mx={2}>
        Página {currentPage} de {totalPages}
      </Text>
      <Button
        size='xs'
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        rightIcon={<ChevronRightIcon boxSize={5} />}
        iconSpacing={0}
      >
        Próxima
      </Button>
    </Flex>
  );
};
