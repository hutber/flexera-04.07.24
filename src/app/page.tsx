'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/app/theme';
import { ConfigProvider } from '@/app/context/ConfigContext';
import { RepoExplorer } from '@/app/RepoExplorer';

const IndexPage: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ConfigProvider>
      <RepoExplorer />
    </ConfigProvider>
  </ThemeProvider>
);

export default IndexPage;
