import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Banner from '@/components/common/Banner';
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
  if (!themeId) return;

  useEffect(() => {
    const fetchThemeInfo = async () => {
      try {
        const res = await axios.get<{ data: ThemeInfo }>(
          getThemeInfoUrl(themeId)
        );
        setThemeInfo(res.data.data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          navigate(ROUTES.HOME);
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
    <Banner backgroundColor={themeInfo.backgroundColor}>
      <TopText>{themeInfo.title}</TopText>
      <BottomText>{themeInfo.description}</BottomText>
    </Banner>
  );
};

export default ThemeHero;

const TopText = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.color.gray[700]};
`;

const BottomText = styled.p`
  ${({ theme }) => theme.typography.label.label1Bold};
  color: ${({ theme }) => theme.color.semantic.text.default};
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
