import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThemeInfo, getThemeProduct } from "@/services/theme";
import styled from "@emotion/styled";
import axios from "axios";
import { showErrorToast } from "@/styles/toast";
import Spacing from "@/components/Spacing";
import type { ProductInfo } from "@/types/product";

type ThemeInfo = {
  themeId: number;
  name: string;
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
};

export default function ThemePage() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeInfo | null>(null);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const goToOrder = (itemId: number) => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) navigate(`/order/${itemId}`);
    else
      navigate("/login", {
        state: { from: `/order/${itemId}` },
      });
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        if (!themeId) return;
        const data = await getThemeInfo(themeId);
        setTheme(data);

        const productData = await getThemeProduct(themeId);
        setProducts(productData.data.list);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          showErrorToast("존재하지 않는 테마입니다.");
          navigate("/", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [themeId, navigate]);

  if (!theme) return null;

  return (
    <Wrapper>
      <HeaderWrapper backgroundColor={theme.backgroundColor}>
        <Name>{theme.name}</Name>
        <Spacing height="8px" />
        <Title>{theme.title}</Title>
        <Spacing height="4px" />
        <Description>{theme.description}</Description>
      </HeaderWrapper>
      <CardWrapper>
        {loading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <EmptyBox>
            <EmptyMessage>상품이 없습니다.</EmptyMessage>
          </EmptyBox>
        ) : (
          <CardGrid>
            {products.map((item) => (
              <Card key={item.id} onClick={() => goToOrder(item.id)}>
                <Image src={item.imageURL} />
                <Spacing height="12px" />
                <Brand>{item.brandInfo.name}</Brand>
                <Label>{item.name}</Label>
                <Spacing height="4px" />
                <Price>
                  {item.price.sellingPrice.toLocaleString()}
                  <PriceUnit>원</PriceUnit>
                </Price>
              </Card>
            ))}
          </CardGrid>
        )}
      </CardWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.section<{ backgroundColor: string }>`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Name = styled.p`
  ${({ theme }) => theme.typography.label1Bold};
  color: ${({ theme }) => theme.colors.gray[100]};
  margin: 0px;
  text-align: left;
`;

const Title = styled.h5`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray.white};
  margin: 0px;
  text-align: left;
`;

const Description = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.gray[200]};
  margin: 0px;
  text-align: left;
`;

const CardWrapper = styled.div`
  padding: 16px;
  width: 100%;
`;

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
  align-itmes: stretch;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const Brand = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin: 0px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Label = styled.h6`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;

const PriceUnit = styled.span`
  ${({ theme }) => theme.typography.subtitle1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;

const Spinner = styled.div`
  margin: 40px auto;
  width: 25px;
  height: 25px;
  border: 4px solid #ccc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const EmptyMessage = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  width: 100%;
  text-align: center;
`;
