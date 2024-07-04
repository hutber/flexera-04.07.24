'use client';

import React from 'react';
import styled from 'styled-components';
import { useConfig } from '@/app/context/ConfigContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing(2.5)};
`;

const Label = styled.label`
  margin-right: ${(props) => props.theme.spacing(1)};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
`;

const DropDown = styled.select((props) => ({
  padding: props.theme.spacing(0.5),
  fontSize: '1rem',
  borderRadius: props.theme.spacing(0.5),
  border: `1px solid ${props.theme.colors.primary}`,
  backgroundColor: props.theme.colors.background,
  color: props.theme.colors.secondary,
  cursor: 'pointer',
}));

const EntryNumberSelector: React.FC = () => {
  const { numberOfEntriesToDisplay, setNumberOfEntriesToDisplay } = useConfig();

  return (
    <Container>
      <Label htmlFor="entries">Entries per page:</Label>
      <DropDown
        id="entries"
        value={numberOfEntriesToDisplay}
        onChange={(e) => setNumberOfEntriesToDisplay(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </DropDown>
    </Container>
  );
};

export default EntryNumberSelector;
