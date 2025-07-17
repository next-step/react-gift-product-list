import { useState, useEffect } from 'react';
import ThemeItem from '@/components/ThemeItem';
import type { Themetype } from '@/types/DTO/themeDTO';
import { ThemeContainerWrapper, ThemeTitle, Message } from '@/styles/Theme/ThemeContainer.styles';
import { getThemes } from '@/apis/theme';
import axios from 'axios';

function ThemeContainer() {
  const [themes, setTheme] = useState<Themetype[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getTheme = async () => {
      try {
        const data = await getThemes();
        setTheme(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.data?.data?.status || '에러 발생';
          setError(status);
        } else {
          setError('알 수 없는 에러');
        }
      } finally {
        setIsLoading(false);
      }
    };
    getTheme();
  }, []);

  if (isLoading) return <>테마를 부르는 중입니다.</>;
  if (error) return <p>{error}</p>;

  return (
    <ThemeContainerWrapper>
      <ThemeTitle>선물 테마</ThemeTitle>
      {themes.map((theme) => (
        <ThemeItem key={theme.themeId} theme={theme} />
      ))}
      <Message>응원 메시지!~!</Message>
    </ThemeContainerWrapper>
  );
}

export default ThemeContainer;
