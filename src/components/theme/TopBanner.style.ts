import styled from '@emotion/styled';

export const HeroSection = styled.section<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  padding: 1.625rem 1rem 1.375rem;
  text-align: center;
`;

export const Gap = styled.div`
  width: 100%;
  height: 8px;
  background-color: transparent;
`;
export const Name = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.1875rem;
  color: ${({ theme }) => theme.color.semantic.background.default};
  margin: 0px;
  text-align: left;
`;

export const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: ${({ theme }) => theme.color.semantic.background.default};
  margin: 0px;
  text-align: left;
`;

export const Description = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: ${({ theme }) => theme.color.semantic.background.default};
  margin: 0px;
  text-align: left;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
`;
