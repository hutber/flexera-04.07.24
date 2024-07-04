import React from 'react';
import styled from 'styled-components';
import RepoItemSkeleton from '@/app/components/RepoItem/RepoItemSkeleton';
import { useConfig } from '@/app/context/ConfigContext';
import RepoItem from './RepoItem';
import { Repository } from '../utils/api';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface RepoListProps {
  repos: Repository[];
  flags: { [key: string]: boolean };
  toggleFlag: (id: string) => void;
  loading: boolean;
}

const RepoList: React.FC<RepoListProps> = ({
  repos,
  flags,
  toggleFlag,
  loading,
}) => {
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
