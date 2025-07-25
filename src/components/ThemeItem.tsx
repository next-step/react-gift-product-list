import { ThemeImage, ThemeItemWrapper, ThemeItemText } from '@/styles/Theme/ThemeItem.styles';
import { useNavigate } from 'react-router-dom';

type ThemeProps = {
  themeId: number;
  name: string;
  image: string;
};

function ThemeItem({ theme }: { theme: ThemeProps }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/themes/${theme.themeId}`);
  };

  return (
    <ThemeItemWrapper onClick={handleClick}>
      <ThemeImage src={theme.image} alt={theme.name} />
      <ThemeItemText>{theme.name}</ThemeItemText>
    </ThemeItemWrapper>
  );
}

export default ThemeItem;
