import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

type CategoryCardProps = {
  name: string;
  image: string;
  themeId: number;
};

export const CategoryCard = ({ name, image, themeId }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `${ROUTES.THEME_DETAIL_TEMPLATE.replace(":themeId", themeId.toString())}`,
    );
  };

  return (
    <Card onClick={handleClick}>
      <Image src={image} alt={name} />
      <Label>{name}</Label>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.colorScale.gray.gray200};
`;

const Label = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.semantic.text.default};
`;
