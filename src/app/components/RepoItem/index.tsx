import React from 'react';
import styled from 'styled-components';

import FlagButton from '@/app/components/FlagButton';
import RepoItemSkeleton from '@/app/components/RepoItem/RepoItemSkeleton';

import { Repository } from '@/app/types/apis';

import 'react-loading-skeleton/dist/skeleton.css';

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(1.25)};
  border-bottom: 1px solid #ccc;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: ${(props) => props.theme.spacing(2.5)};
`;

const Info = styled.a`
  display: flex;
  align-items: center;
  flex: 1;
`;

interface RepoItemProps {
  repo: Repository;
  flagged: boolean;
  toggleFlag: (id: string) => void;
  loading: boolean;
}

const RepoItem: React.FC<RepoItemProps> = ({
  repo,
  flagged,
  toggleFlag,
  loading,
}) => {
  if (loading) {
    return <RepoItemSkeleton />;
  }

  return (
    <Item>
      <Info href={repo?.html_url} target="_blank">
        <Avatar src={repo!.owner.avatar_url} alt={repo!.owner.login} />
        <div>
          <strong>{repo!.full_name}</strong>
          <p>{repo!.description}</p>
        </div>
      </Info>
      <FlagButton flagged={flagged!} onClick={() => toggleFlag!(repo!.id)} />
    </Item>
  );
};

export default RepoItem;
