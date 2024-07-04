'use client';

import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '@/app/theme';
import { ConfigProvider, useConfig } from '@/app/context/ConfigContext';
import EntryNumberSelector from '@/app/components/EntryNumberSelector';
import RepoList from './components/RepoList';
import Pagination from './components/Pagination';
import { fetchRepos, Repository } from './utils/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing(2.5)};
`;

const IndexPageContent: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const localStorageFlags = localStorage.getItem('repoFlags');
  const [flags, setFlags] = useState<{ [key: string]: boolean }>(
    localStorageFlags ? JSON.parse(localStorageFlags) : {},
  );
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

  useEffect(() => {
    localStorage.setItem('repoFlags', JSON.stringify(flags));
  }, [flags]);

  const toggleFlag = (id: string) => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      [id]: !prevFlags[id],
    }));
  };

  return (
    <Container>
      <h1>GitHub Repositories</h1>
      <EntryNumberSelector />
      <RepoList
        repos={repos}
        flags={flags}
        toggleFlag={toggleFlag}
        loading={loading}
      />
      <Pagination
        loading={loading}
        page={page}
        setPage={setPage}
        disableNext={repos.length === 0 || totalCount === 0}
      />
    </Container>
  );
};

const IndexPage: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ConfigProvider>
      <IndexPageContent />
    </ConfigProvider>
  </ThemeProvider>
);

export default IndexPage;
