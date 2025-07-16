//RisingSection의 리스트 여기에 재사용 가능할듯.
import styled from "@emotion/styled";
import type { Product } from "@/types/api_types";

type Props = {
  products: Product[];
};

export default function ThemeProductsList({ products }: Props) {
  if (products.length === 0) return <p>상품이 없습니다.</p>;

  return (
    <List>
      {products.map((product) => (
        <Card key={product.id}>
          <img src={product.imageURL} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.brandInfo.name}</p>
          <p>{product.price.sellingPrice.toLocaleString()}원</p>
        </Card>
      ))}
    </List>
  );
}

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

const Card = styled.div`
  overflow: hidden;
  padding: 12px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 30px;
  }

  h3 {
    font-size: 16px;
    margin: 8px 0;
  }

  p {
    margin: 4px 0;
    color: #888;
  }
`;
