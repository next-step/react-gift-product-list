import { getThemeInfo } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import Layout from "@/layout";
import { useParams } from "react-router-dom";
import { THEME_INFO_API_MESSAGE } from "./constants/apiMessage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { LoadingContainer } from "../HomePage/components/Category/Category.styles";

function ThemeProductPage() {
  const params = useParams();

  const { data, isLoading } = useFetch({
    fetchFn: () => getThemeInfo(Number(params.themeId)),
    errorHandler: () => {
      console.error(THEME_INFO_API_MESSAGE.FETCH_ERROR);
    },
  });

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <Layout>
      <div>{data?.name}</div>
      <div>{data?.title}</div>
      <div>{data?.description}</div>
      <div>{params.themeId}</div>
    </Layout>
  );
}

export default ThemeProductPage;
