import TheHeader from "@/components/layout/TheHeader";
import ThemesInfo from "@/components/themes/ThemesInfo";
import ThemesProducts from "@/components/themes/ThemesProducts";
import styled from "@emotion/styled";
import { useParams } from "react-router";

const ThemesPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <TheHeader />
      <Main>
        <ThemesInfo id={id} />
        <ThemesProducts id={id} />
      </Main>
    </>
  );
};

export default ThemesPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray00};
  height: 100%;
  min-height: 100vh;
`;
