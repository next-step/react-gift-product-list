import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import type { UseFetchResult } from '@/hooks/useFetch';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

interface ThemeHeroProps {
  themeId: number;
}

export function ThemeHero({ themeId }: ThemeHeroProps) {
  const navigate = useNavigate();
  const { data: info, loading, error } = useFetch<{ data: ThemeInfo }>(
    {
      url: `/api/themes/${themeId}/info`,
      method: 'get',
    },
    [themeId]
  );

  // 로딩
  if (loading) return <div>로딩 중…</div>;

  // 에러 처리: 404 시 홈으로 리다이렉트
  if (error) {
    if (error.response?.status === 404) {
      navigate('/', { replace: true });
      return null;
    }
    console.error('테마 상세 정보 로드 실패:', error);
    return <div>정보를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 데이터 없으면 렌더링하지 않음
  if (!info) return null;

  const { title, description, backgroundColor } = info.data;

  return (
    <section
      style={{
        backgroundColor,
        padding: '60px 20px',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: '0 0 16px' }}>{title}</h1>
      <p style={{ fontSize: '1.125rem', maxWidth: 600, margin: '0 auto' }}>
        {description}
      </p>
    </section>
  );
}
