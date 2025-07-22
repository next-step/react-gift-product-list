import {
  Title,
  Section,
  ThemeListContainer,
  YellowBox,
  Loading,
} from '@/components/GiftThema/Thema/GiftThema.styles.ts';
import ThemeItem from '@/components/GiftThema/Thema/ThemeItem.tsx';
import useFetchThemes from '@/hooks/fetch/useFetchThemes.ts';
import { useNavigate } from 'react-router-dom';

export default function GiftThema() {
  const navigate = useNavigate();
  const { themes, loading, error } = useFetchThemes();

  if (error || !Array.isArray(themes) || themes.length === 0) {
    return null;
  }

  const onThemesClickHandle = (item) => {
    navigate(`/themes/${item.themeId}`);
  };

  return (
    <Section>
      <Title>선물 테마</Title>

      {loading ? (
        <Loading>로딩 중...</Loading>
      ) : (
        <ThemeListContainer>
          {themes.map((item) => (
            <ThemeItem
              key={item.themeId}
              image={item.image}
              name={item.name}
              onClick={() => onThemesClickHandle(item)}
            />
          ))}
        </ThemeListContainer>
      )}

      <YellowBox>
        <div>카카오테크 캠퍼스 3기 여러분</div>
        <div>프론트엔드 2단계 과제 화이팅! 🎉</div>
      </YellowBox>
    </Section>
  );
}
