import styled from '@emotion/styled';

export const Container = styled.div<{ height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  font-size: 18px;
`; 