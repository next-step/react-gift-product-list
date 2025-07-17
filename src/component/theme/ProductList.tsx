import {
} from '@/component/main/GiftRanking.styled';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultProductItemFromTheme, type ProductItem, type ProductItemFromTheme } from '@/type/product';
import { CentorAlignDiv240, Spinner, SpinnerWrapper } from '@/styles/CommomStyle/Common.styled';

import { BrandImage, Price, ProductCard, ProductGrid, ProductImage, ProductInfo } from '@/styles/CommomStyle/ProductList';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import { useState } from 'react';



const ProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [cursor, setCursor] = useState(0);
  const productsUrl = `http://localhost:3000/api/themes/${themeId}/products?cursor=${cursor}`
  const { item, loding, error } = useFetchFromUrlT<ProductItemFromTheme>(productsUrl, defaultProductItemFromTheme);
  const { user } = useAuth();
  const navigate = useNavigate();
  const productList = item?.list;


  const handleClickProduct = (product: ProductItem) => {
    if (!user) {
      navigate(`/login?redirect=/order?id=${product.id}`);
    } else {
      navigate(`/order?id=${product.id}`);
    }
  };


  if (error) return null

  if (productList === null || loding) return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )
  if (!productList || productList?.length === 0) return (
    <CentorAlignDiv240>
      <p>상품이 없습니다</p>
    </CentorAlignDiv240>
  )
  return (
    <>
      <ProductGrid>
        {productList.map((product: ProductItem) => (
          <ProductCard
            key={product.id}
            onClick={() => handleClickProduct(product)}
          >
            <ProductImage src={product.imageURL} alt={product.name} />
            <BrandImage
              src={product.brandInfo.imageURL}
              alt={product.brandInfo.name}
            />
            <ProductInfo title={product.name}>{product.name}</ProductInfo>
            <Price>{product.price.sellingPrice.toLocaleString()} 원</Price>
          </ProductCard>
        ))}
      </ProductGrid>
    </>
  )
};

export default ProductList;