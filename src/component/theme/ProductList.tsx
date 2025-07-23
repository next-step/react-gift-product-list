import {
} from '@/component/main/GiftRanking.styled';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultProductItemFromTheme, type ProductItem, type ProductItemFromTheme } from '@/type/GiftAPI/product';
import { CentorAlignDiv240,} from '@/styles/CommomStyle/Common.styled';

import { BrandImage, Price, ProductCard, ProductGrid, ProductImage, ProductInfo } from '@/styles/CommomStyle/ProductList';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { BaseUrl } from '@/constant/api';


const ProductList = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cursor, setCursor] = useState(0);
  const [productList,serProductList] = useState<ProductItem[]>([]);
  const [loaderRef, setLoaderRef] = useState<HTMLDivElement | null>(null);
  const [extraLoading, setExtraLoading] = useState(false);

  const productsUrl = `${BaseUrl}/api/themes/${themeId}/products?cursor=${cursor}`
  const { item, loading, error } = useFetchFromUrlT<ProductItemFromTheme>(productsUrl, defaultProductItemFromTheme,true);


  useEffect(() => {
    if (item?.list) {
      serProductList(prev => [...prev, ...item.list]);
      setExtraLoading(false);
    }
  },[item]);

  useEffect(() =>{
    if(!loaderRef) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCursor(prev => prev + 10);
        setExtraLoading(true);
      }
  }, 
  {
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  });

  observer.observe(loaderRef);

  return () => observer.disconnect();
}, [loaderRef]);


  const handleClickProduct = (product: ProductItem) => {
    if (!user) {
      navigate(`/login?redirect=/order?id=${product.id}`);
    } else {
      navigate(`/order?id=${product.id}`);
    }
  };


  if (error) return null

  if (loading) return (
    <Loading/>
  );
  
  if (!loading && productList.length === 0 && item?.list?.length === 0) return (
    <CentorAlignDiv240>
      <p>상품이 없습니다</p>
    </CentorAlignDiv240>
  );

  return (
    <>
      <ProductGrid>
        {productList.map(product => (
          <ProductCard key={product.id} onClick={() => handleClickProduct(product)}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <BrandImage src={product.brandInfo.imageURL} alt={product.brandInfo.name} />
            <ProductInfo title={product.name}>{product.name}</ProductInfo>
            <Price>{product.price.sellingPrice.toLocaleString()} 원</Price>
          </ProductCard>
        ))}
      </ProductGrid>
      <Loading loading={extraLoading}/>
      <div ref={setLoaderRef} style={{ height: '10px' }} />
    </>
  );
};


export default ProductList;