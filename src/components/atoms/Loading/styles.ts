import styled from '@emotion/styled';

export const Container = styled.div<{ height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  font-size: 18px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.gray[300]};
  border-top: 4px solid ${({ theme }) => theme.colors.blue[600]};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Text = styled.span`
  margin-left: 10px;
`; 