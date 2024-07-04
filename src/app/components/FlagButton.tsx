import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  flagged: boolean;
}

const Button = styled.button<ButtonProps>((props) => ({
  backgroundColor: props.flagged
    ? props.theme.colors.primary
    : props.theme.colors.secondary,
  fontSize: '1.4rem',
  color: 'white',
  border: 'none',
  padding: `${props.theme.spacing(0.625)}`,
  marginLeft: `${props.theme.spacing(0.625)}`,
  cursor: 'pointer',
  width: props.theme.spacing(8),
  borderRadius: props.theme.spacing(0.625),
  '&:hover': {
    backgroundColor: props.flagged
      ? props.theme.colors.primaryHover
      : props.theme.colors.secondaryHover,
  },
}));

interface FlagButtonProps {
  flagged: boolean;
  onClick: () => void;
}

const FlagButton: React.FC<FlagButtonProps> = ({ flagged, onClick }) => (
  <Button flagged={flagged} onClick={onClick}>
    {flagged ? '-' : '+'}
  </Button>
);

export default FlagButton;
