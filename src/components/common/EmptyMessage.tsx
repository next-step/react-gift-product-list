import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface EmptyMessageProps {
  children: ReactNode;
  minHeight?: string;
}

const EmptyMessage = ({
  children,
  minHeight = '28.75rem',
}: EmptyMessageProps) => {
  return <Container minHeight={minHeight}> {children}</Container>;
};

export default EmptyMessage;

const Container = styled.div<{ minHeight: string }>(({ theme, minHeight }) => ({
  ...theme.typography.body1Regular,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight,
}));
