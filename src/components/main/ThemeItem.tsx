import styled from "@emotion/styled";

const ThemeItemContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  rowGap: `${theme.spacing1}`,
  cursor: "pointer",
}));

const ThemeItemImage = styled.img({
  width: "50px",
  height: "50px",
  objectFit: "contain",
  borderRadius: "18px",
});

const ThemeItemTitle = styled.p(({ theme }) => ({
  fontSize: `${theme.typography.label2Regular.fontSize}`,
  lineHeight: `${theme.typography.label2Regular.lineHeight}`,
  fontWeight: `${theme.typography.label2Regular.fontWeight}`,
  color: `${theme.color.gray[900]}`,
}));

interface ThemeItemProps {
  image: string;
  name: string;
  onClick: () => void;
}
export const ThemeItem = ({ image, name, onClick }: ThemeItemProps) => {
  return (
    <ThemeItemContainer>
      <ThemeItemImage src={image} alt="테마 이미지" onClick={onClick} />
      <ThemeItemTitle>{name}</ThemeItemTitle>
    </ThemeItemContainer>
  );
};
