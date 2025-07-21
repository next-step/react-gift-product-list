import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';

import { ROUTES } from '@/constants/routes';
import { getThemeInfoUrl } from '@/constants/api';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ThemeHero = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchThemeInfo = async () => {
      try {
        const res = await axios.get<{ data: ThemeInfo }>(
          getThemeInfoUrl(themeId!)
        );
        setThemeInfo(res.data.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          navigate(ROUTES.NOT_FOUND);
        } else {
          setError(true);
        }
      }
    };

    fetchThemeInfo();
  }, [themeId, navigate]);

  if (error) return <ErrorText>테마 정보를 불러오지 못했어요.</ErrorText>;
  if (!themeInfo) return <LoadingText>불러오는 중...</LoadingText>;

  return (
    <Section style={{ backgroundColor: themeInfo.backgroundColor }}>
      <TagText>{themeInfo.name}</TagText>
      <Title>{themeInfo.title}</Title>
      {themeInfo.description && (
        <Description>{themeInfo.description}</Description>
      )}
    </Section>
  );
};

export default ThemeHero;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TagText = styled.p`
  ${({ theme }) => theme.typography.subtitle.subtitle2Bold};
  color: ${({ theme }) => theme.color.gray[0]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.h5`
  ${({ theme }) => theme.typography.title.title1Bold};
  color: ${({ theme }) => theme.color.gray[0]};
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body.body1Regular};
  color: ${({ theme }) => theme.color.gray[0]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const LoadingText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const ErrorText = styled.p`
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.color.red[500]};
  text-align: center;
`;
