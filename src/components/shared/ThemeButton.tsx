import styled from "@emotion/styled";

type ThemeButtonProps = {
  image: string;
  caption: string;
};

function ThemeButton({ image, caption }: ThemeButtonProps) {
  return (
    <ThemeButtonWrapper
      onClick={() => {
        console.log(`Navigate to ${caption}`);
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
