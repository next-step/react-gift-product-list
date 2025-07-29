import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

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
  const [info, setInfo] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get<{ data: ThemeInfo }>(`/api/themes/${themeId}/info`)
      .then(res => {
        setInfo(res.data.data);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          navigate('/', { replace: true });
        } else {
          console.error('테마 상세 정보 로드 실패:', err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [themeId, navigate]);

  if (loading) return <div>로딩 중…</div>;
  if (!info) return null;

  return (
    <section
      style={{
        backgroundColor: info.backgroundColor,
        padding: '60px 20px',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: '0 0 16px' }}>{info.title}</h1>
      <p style={{ fontSize: '1.125rem', maxWidth: 600, margin: '0 auto' }}>
        {info.description}
      </p>
    </section>
  );
}
