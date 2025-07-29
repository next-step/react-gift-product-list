import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useFetch } from '@/hooks/useFetch';
import type { UseFetchResult } from '@/hooks/useFetch';
import { SelectThemeSectionListItem } from './ListItem';
import { Typography } from '@/components/common/Typography';

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

export const SelectThemeSection: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<{ data: Theme[] }>(
    { url: '/api/themes', method: 'get' },
    []  // 빈 배열: 마운트 시 한 번 실행
  );

  // 로딩 중
  if (loading) {
    return (
      <Section>
        <SpinWrapper><Loader /></SpinWrapper>
      </Section>
    );
  }

  // 에러나 빈 데이터면 렌더 하지 않음
  if (error || !data?.data.length) return null;

  const themes = data.data;

  return (
    <Section>
      <TitleWrapper>
        <Typography as="h3" variant="title1Bold" color="default">
          선물 테마
        </Typography>
      </TitleWrapper>
      <Wrapper>
        {themes.map(theme => (
          <SelectThemeSectionListItem
            key={theme.themeId}
            image={theme.image}
            label={theme.name}
            onClick={() => navigate(`/themes/${theme.themeId}/products`)}
          />
        ))}
      </Wrapper>
    </Section>
  );
};

const spin = keyframes` to { transform: rotate(360deg); } `;
const Loader = styled.div` width:48px; height:48px; border:4px solid rgba(0,0,0,0.1); border-top-color:rgba(0,0,0,0.7); border-radius:50%; animation:${spin} 1s linear infinite; `;
const SpinWrapper = styled.div` display:flex; align-items:center; justify-content:center; height:150px; `;
const Section = styled.section(({ theme }) => ({ padding: `0 ${theme.spacing.spacing2}`, }));
const TitleWrapper = styled.div(({ theme }) => ({ padding: `0 ${theme.spacing.spacing2} ${theme.spacing.spacing5}`, }));
const Wrapper = styled.div(({ theme }) => ({ width:'100%', display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:`${theme.spacing.spacing5} ${theme.spacing.spacing1}`, }));





