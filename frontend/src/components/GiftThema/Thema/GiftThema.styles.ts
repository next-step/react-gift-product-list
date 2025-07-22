import styled from '@emotion/styled';

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.gray00};
`;

export const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0 20px 12px;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const ThemeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing10};
  width: max-content;
  margin: 0 auto;

  

  @media (max-width: 680px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

export const YellowBox = styled.div`
  background-color: ${({ theme }) => theme.colors.semantic.brand.kakaoYellow};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.spacing4};
  margin-top: 30px;
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.gray1000};
  line-height: 1.5;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
  margin: 40px 0;
`;
