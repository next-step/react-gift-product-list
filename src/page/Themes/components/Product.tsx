import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { ProductData } from '..';

const ProductBox = ({ product }: { product: ProductData }) => {
  if (!product) return null;

  return (
    <Link to={`/themes/${product.id}`}>
      <ProductOntainer>
        <ProductImg alt={product.name} src={product.imageURL} />
        <ProductBrandInfo>{product.brandInfo.name}</ProductBrandInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price.basicPrice}</ProductPrice>
      </ProductOntainer>
    </Link>
  );
};

export default ProductBox;

const ProductOntainer = styled.div`
  width: 100%;
`;

const ProductImg = styled.img`
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

const ProductBrandInfo = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  color: rgb(176, 179, 186);
  margin: 0px;
  text-align: left;
`;
const ProductName = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;
