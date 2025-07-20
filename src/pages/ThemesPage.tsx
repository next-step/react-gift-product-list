import TheHeader from "@/components/layout/TheHeader";
import ThemesInfo from "@/components/themes/ThemesInfo";
import ThemesProducts from "@/components/themes/ThemesProducts";
import { useParams } from "react-router";

const ThemesPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <TheHeader />
      <ThemesInfo id={id} />
      <ThemesProducts id={id} />
    </>
  );
};

export default ThemesPage;
