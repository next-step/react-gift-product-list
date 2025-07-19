import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";

const ThemeProduct = () => {
  const { id } = useParams();

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />
        <main>
          <h2>테마 상품 페이지</h2>
          <p>theme Id: {id}</p>
        </main>
      </PageContainer>
    </PageLayout>
  );
};

export default ThemeProduct;
