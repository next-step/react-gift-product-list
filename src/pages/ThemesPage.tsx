import ThemesInfo from "@/components/themes/ThemesInfo";
import ThemesProducts from "@/components/themes/ThemesProducts";
import { useParams } from "react-router";

const ThemesPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <ThemesInfo id={id} />
      <ThemesProducts id={id} />
    </div>
  );
};

export default ThemesPage;
