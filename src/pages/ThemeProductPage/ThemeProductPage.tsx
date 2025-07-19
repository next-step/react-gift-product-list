import { getThemeInfo } from "@/data/api";
import { useFetch } from "@/hooks/useFetch";
import Layout from "@/layout";
import { useParams } from "react-router-dom";

function ThemeProductPage() {
  const params = useParams();

  const { data, isLoading } = useFetch({
    fetchFn: () => getThemeInfo(Number(params.themeId)),
    errorHandler: () => {
      console.error("테마 정보 로딩 실패");
    },
  });

  if (isLoading) {
    return <div>로딩중...</div>;
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
