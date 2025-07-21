import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { getThemeInfo } from '@/api/themes';
import type { Theme } from '@/api/types';
import { ROUTE_HOME } from '@/constants';

const HeroSection = styled.div<{ bg: string }>`
  background: ${(props) => props.bg};
  color: #fff;
  border-radius: 20px;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  margin: 2rem 0;
  max-width: 100%;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  text-align: left;
`;

const HeroName = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 8px;
`;

const HeroTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 6px;
`;

const HeroDescription = styled.div`
  font-weight: 400;
  font-size: 15px;
  opacity: 0.95;
`;

const ThemeProductListPage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeId) return;
    setLoading(true);
    getThemeInfo(themeId)
      .then((data) => {
        setTheme(data);
        setError(null);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          navigate(ROUTE_HOME, { replace: true });
        } else {
          setError('테마 정보를 불러오지 못했습니다.');
        }
      })
      .finally(() => setLoading(false));
  }, [themeId, navigate]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!theme) return null;

  return (
    <div>
      {/* 히어로 영역 */}
      <HeroSection bg={theme.backgroundColor}>
        <HeroName>{theme.name}</HeroName>
        <HeroTitle>{theme.title}</HeroTitle>
        <HeroDescription>{theme.description}</HeroDescription>
      </HeroSection>
      {/* 상품 목록 영역(다음 단계) */}
    </div>
  );
};

export default ThemeProductListPage;
