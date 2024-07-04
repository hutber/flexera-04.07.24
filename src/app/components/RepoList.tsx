import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import RepoItemSkeleton from '@/app/components/RepoItem/RepoItemSkeleton';
import RepoItem from '@/app/components/RepoItem';

import { useConfig } from '@/app/context/ConfigContext';

import { Repository } from '@/app/types/apis';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface RepoListProps {
  repos: Repository[];
  loading: boolean;
}

const RepoList: React.FC<RepoListProps> = ({ repos, loading }) => {
  const [flags, setFlags] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const localStorageFlags = localStorage.getItem('repoFlags');
    if (localStorageFlags) {
      setFlags(JSON.parse(localStorageFlags));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repoFlags', JSON.stringify(flags));
  }, [flags]);

  const toggleFlag = (id: string) => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      [id]: !prevFlags[id],
    }));
  };

  const { numberOfEntriesToDisplay } = useConfig();

  return (
    <List>
      {loading
        ? Array(numberOfEntriesToDisplay)
            .fill({})
            .map((_, index) => (
              <RepoItemSkeleton key={`RepoItemSkeleton_$P${index}`} />
            ))
        : repos.map((repo) => (
            <RepoItem
              key={repo.id}
              repo={repo}
              flagged={flags[repo.id]}
              toggleFlag={toggleFlag}
              loading={false}
            />
          ))}
    </List>
  );
};

export default RepoList;
