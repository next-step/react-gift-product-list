import * as S from './CategorySection.styles';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';

interface Props {
  name: string;
  image: string;
  themeId: number;
}

const CategoryItem = ({ name, image, themeId }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.THEME_PRODUCTS(themeId));
  };

  return (
    <S.Item onClick={handleClick}>
      <S.Image src={image} alt={name} />
      <S.Name>{name}</S.Name>
    </S.Item>
  );
};

export default CategoryItem;
