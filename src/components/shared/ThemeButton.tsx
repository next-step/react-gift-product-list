import styled from "@emotion/styled";
import { PATH } from "@src/router/Router";
import { useNavigate } from "react-router-dom";

type ThemeButtonProps = {
  id: number;
  image: string;
  caption: string;
};

function ThemeButton({ id, image, caption }: ThemeButtonProps) {
  const navigate = useNavigate();

  return (
    <ThemeButtonWrapper
      onClick={() => {
        navigate(PATH.THEME + `/${id}`);
      }}
    >
      <ThemeImageHolder src={image} alt="image" />
      <div>{caption}</div>
    </ThemeButtonWrapper>
  );
}

const ThemeImageHolder = styled.img`
  max-width: 60px;
  max-height: 60px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ThemeButtonWrapper = styled.button`
  width: 100%;
  background-color: white;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default ThemeButton;
