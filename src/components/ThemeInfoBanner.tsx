import { useParams, useNavigate } from 'react-router-dom';
import { useHTTP } from '@/hooks/useHTTP';
import { getThemeInfo } from '@/services/theme';
import { isAxiosError } from 'axios';
import styled from '@emotion/styled';
import type { CSSProperties } from 'react';
import { toast } from 'react-toastify';

export const ThemeInfoBanner = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const { isPending, data } = useHTTP({
    apiFunction: () => getThemeInfo(Number(themeId)),
    requestOnMount: true,
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 404) {
        toast.error('해당 ID에 일치하는 데이터가 없습니다.');
        navigate('/');
      }
    },
  });

  if (isPending || !data) return <div style={{height: '128px'}} />;

  return (
    <Container backgroundColor={data.backgroundColor}>
      <ThemeName>{data.name}</ThemeName>
      <ThemeTitle>{data.title}</ThemeTitle>
      <ThemeDescription>{data.description}</ThemeDescription>
    </Container>
  );
};

const Container = styled.section<{ backgroundColor?: CSSProperties['backgroundColor'] }>`
    width: 100%;
    height: 128px;

    padding: 26px 16px 22px 16px;

    background-color: ${({ backgroundColor }) => backgroundColor};
    color: #fff;
`;

const ThemeName = styled.p`
    font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.label.label1Bold.fontWeight};
`;

const ThemeTitle = styled.h1`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
`;

const ThemeDescription = styled.p`
    font-size: ${({ theme }) => theme.typography.body.body1Regular.fontSize};
    font-weight: ${({ theme }) => theme.typography.body.body1Regular.fontWeight};

    margin-top: 8px;
`;
