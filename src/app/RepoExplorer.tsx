'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Repository } from '@/app/types/apis';
import { fetchRepos } from '@/app/utils/api';

import { useConfig } from '@/app/context/ConfigContext';

import EntryNumberSelector from '@/app/components/EntryNumberSelector';
import RepoList from '@/app/components/RepoList';
import Pagination from '@/app/components/Pagination';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing(2.5)};
`;

export const RepoExplorer: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { numberOfEntriesToDisplay } = useConfig();

  useEffect(() => {
    const fetchAndSetRepos = async () => {
      setLoading(true);
      const { items, totalCount: count } = await fetchRepos(
        page,
        numberOfEntriesToDisplay,
      );
      setRepos(items);
      setTotalCount(count);
      setLoading(false);
    };
    fetchAndSetRepos();
  }, [page, numberOfEntriesToDisplay]);

  return (
    <Container>
      <h1>GitHub Repositories</h1>
      <EntryNumberSelector />
      <RepoList repos={repos} loading={loading} />
      <Pagination
        loading={loading}
        page={page}
        setPage={setPage}
        disableNext={repos.length === 0 || totalCount === 0}
      />
    </Container>
  );
};
