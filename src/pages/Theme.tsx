import Navbar from '@/components/navbar/Navbar';
import { PaddingSm } from './../components/common/Padding';
import styled from '@emotion/styled';
import axios from 'axios';
import { useFetch } from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const Header = styled.section`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: rgb(89, 73, 163);
`;
const CategoryName = styled.p`
  ${({ theme }) => theme.typography.subtitle2Bold};
  color: ${({ theme }) => theme.colors.gray.gray100};
  margin: 0px;
  text-align: left;
`;
const ListContainer = styled.div`
  padding: 16px;
  width: 100%;
`;
const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;
const Card = styled.a``;
const Image = styled.img`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 4px;
  overflow: hidden;
  background-color: rgb(243, 244, 245);
`;

const fetchthemeInfo = async (themeId: number) => {
  return await axios
    .get(`http://localhost:3000/api/themes/${themeId}/info`)
    .then((res) => res.data.data);
};
const fetchThemeProducts = async (themeId: number, cursor: number, limit: number) => {
  return await axios
    .get(`http://localhost:3000/api/themes/${themeId}/products`, {
      params: {
        cursor,
        limit,
      },
    })
    .then((res) => res.data.data);
};

const Theme = () => {
  const { themeId } = useParams();
  const themeIdNumber = Number(themeId);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const [products, setProducts] = useState<Type[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const LIMIT = 10;

  useEffect(() => {
    if (!inView || !hasNext || isFetching) return;

    if (inView) {
      setIsFetching(true);
      console.log('요소가 화면에 보입니다!');
      fetchThemeProducts(themeIdNumber, cursor, LIMIT)
        .then((data) => {
          console.log(data);
          setProducts((prev) => [...prev, ...data.list]);
          setCursor(data.cursor);
          setHasNext(data.hasMoreList);
          setIsFetching(false)
        })
        .catch((error) => {
          console.error('테마 상품 로딩 중 오류 발생:', error);
        });
    }
  }, [inView, cursor, hasNext]);

  const {
    data: themeData,
    isLoading,
    error,
  } = useFetch({
    fetcher: () => fetchthemeInfo(themeIdNumber),
    initValue: null,
    deps: [themeIdNumber],
  });

  console.dir(products);
  if (isLoading || !themeData) return <div>로딩중...</div>;

  return (
    <div>
      <Navbar />
      <Header style={{ backgroundColor: themeData.color }}>
        <CategoryName>{themeData.name}</CategoryName>
        <PaddingSm />
        <h5>{themeData.title}</h5>
        <PaddingSm />
        <p>{themeData.description}</p>
      </Header>

      <ListContainer>
        <GridWrapper>
          {products.map((product: any) => (
            <Card key={product.id}>
              <div>
                <Image src={product.imageURL} alt={product.name} />
                <PaddingSm />
                <p>{product.brand}</p>
                <h6>{product.name}</h6>
                <p>{product.price.sellingPrice}원</p>
              </div>
            </Card>
          ))}
        </GridWrapper>
        <div ref={ref} style={{ height: '1px' }} />
        {/* 감시 대상 요소 */}
      </ListContainer>
    </div>
  );
};

export default Theme;
