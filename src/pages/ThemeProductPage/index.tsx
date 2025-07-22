/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeHero from './ThemeHero';
import ThemeProductList from './ThemeProductList';
import { fetchThemeInfo, type ThemeInfo } from '../../apis/info';
import axios from 'axios';

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

    const loadThemeInfo = async () => {
      setLoading(true);
      try {
        const data = await fetchThemeInfo(themeId);
        setThemeInfo(data);
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

    loadThemeInfo();
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
