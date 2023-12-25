import { Flex, Text } from '@chakra-ui/react';
import { Button } from '../atoms/Button';

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
    <Flex justifyContent='flex-end' alignItems='center' mt={4}>
      <Button
        size='sm'
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
      >
        Previous
      </Button>
      <Text mx={2}>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        size='sm'
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </Flex>
  );
};
