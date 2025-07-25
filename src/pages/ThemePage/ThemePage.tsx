import { useParams, useNavigate } from "react-router-dom";
import { useThemeProducts } from "@/hooks/useThemeProducts";
import { useAuthContext } from "@/hooks/useAuthContext";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import CardList from "@/components/CardList/CardList";
import {
  Wrapper,
  Container,
  HeroSection,
  ThemeLabel,
  ThemeTitle,
  ThemeDescription,
  Section,
  EmptyBox,
} from "@/pages/ThemePage/ThemePage.style";

const ThemePage = () => {
  const { id } = useParams();
  const { theme, products, loading, hasMoreList, observerRef } =
    useThemeProducts(Number(id));
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleCardClick = (cardId: number) => {
    if (!user) {
      navigate("/login", { state: { from: `/order/${cardId}` } });
    } else {
      navigate(`/order/${cardId}`);
    }
  };

  if (loading) {
    return <LoadingSpinner size={30} />;
  }

  if (!theme) {
    return <div>테마를 불러오지 못했습니다.</div>;
  }

  return (
    <Wrapper>
      <NavigationBar />
      <Container>
        <HeroSection bgColor={theme.backgroundColor}>
          <ThemeLabel>{theme.name}</ThemeLabel>
          <ThemeTitle>{theme.title}</ThemeTitle>
          <ThemeDescription>{theme.description}</ThemeDescription>
        </HeroSection>
        <Section>
          {products.length === 0 ? (
            <EmptyBox>상품이 없습니다.</EmptyBox>
          ) : (
            <>
              <CardList
                cards={products}
                showRank={false}
                lastCardRef={hasMoreList ? observerRef : undefined}
                onCardClick={handleCardClick}
              />
              {loading && <LoadingSpinner size={20} />}
            </>
          )}
        </Section>
      </Container>
    </Wrapper>
  );
};

export default ThemePage;
