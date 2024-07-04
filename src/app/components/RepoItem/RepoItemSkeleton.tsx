import React from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing(1.25)};
  border-bottom: 1px solid #ccc;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const RepoItemSkeleton: React.FC = () => (
  <Item>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Info>
        <Skeleton circle height={50} width={50} aria-label="Avatar skeleton" />
        <div style={{ marginLeft: 20 }}>
          <Skeleton width={200} aria-label="Name skeleton" />
          <Skeleton width={300} aria-label="Description skeleton" />
        </div>
      </Info>
      <Skeleton width={80} height={40} aria-label="Button skeleton" />
    </SkeletonTheme>
  </Item>
);

export default RepoItemSkeleton;
