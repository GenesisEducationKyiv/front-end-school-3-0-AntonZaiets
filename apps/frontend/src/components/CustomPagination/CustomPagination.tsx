import React from 'react';
import Button from '@/ui/Button/Button.tsx';
import Box from '@/ui/Box/Box.tsx';
import { IPagination } from './Interface';

const CustomPagination = React.memo<IPagination>(
  ({ currentPage, totalPages = 5, onPageChange }) => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        mt={3}
        data-testid="pagination"
      >
        <Button
          variant="outlined"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          data-testid="pagination-prev"
        >
          Previous
        </Button>
        <span data-testid="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outlined"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          data-testid="pagination-next"
        >
          Next
        </Button>
      </Box>
    );
  }
);

CustomPagination.displayName = 'CustomPagination';

export default CustomPagination;
