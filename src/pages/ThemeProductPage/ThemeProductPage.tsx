import Layout from "@/layout";
import { useParams } from "react-router-dom";

function ThemeProductPage() {
  const params = useParams();

  return (
    <Layout>
      <div>{params.themeId}</div>
    </Layout>
  );
}

export default ThemeProductPage;
