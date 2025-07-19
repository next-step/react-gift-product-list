/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ThemeHero from './ThemeHero';
import ThemeProductList from './ThemeProductList';

type ThemeInfo = {
  themeId: number;
  name: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
};

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!themeId) {
      navigate('/');
      return;
    }

    const fetchThemeInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/themes/${themeId}/info`);
        setThemeInfo(response.data.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate('/');
        } else {
          console.error('테마 정보 조회 실패:', error);
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThemeInfo();
  }, [themeId, navigate]);

  if (loading) return <div>로딩 중...</div>;
  if (!themeInfo) return null;

  return (
    <main>
      <ThemeHero
        name={themeInfo.name}
        title={themeInfo.title}
        description={themeInfo.description}
        backgroundColor={themeInfo.backgroundColor}
      />
      <ThemeProductList />
    </main>
  );
};

export default ThemeProductPage;
