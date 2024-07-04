import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing(2.5)};
`;

const Button = styled.button`
  padding: 5px 12px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

const PageDetails = styled.button`
  padding: 5px 12px;
  margin: 0 6px;
`;

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  disableNext: boolean;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  disableNext,
  loading,
}) => (
  <PaginationWrapper>
    <Button onClick={() => setPage(page - 1)} disabled={page === 1 || loading}>
      Previous
    </Button>
    <PageDetails>{page}</PageDetails>
    <Button onClick={() => setPage(page + 1)} disabled={disableNext || loading}>
      Next
    </Button>
  </PaginationWrapper>
);

export default Pagination;
