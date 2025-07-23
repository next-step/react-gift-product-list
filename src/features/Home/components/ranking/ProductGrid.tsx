import LoadingSpinner from '@components/common/LoadingSpinner';
import type { GridProps, RankedProduct } from './RankingTypes';
import styled from '@emotion/styled';
import EmptyMessage from '@components/common/EmptyMessage';

const ProductGrid = ({
  products,
  loading,
  error,
  isExpanded,
  toggleExpand,
  onClickItem,
}: GridProps) => {
  const visibleItems = isExpanded ? products : products.slice(0, 6);
  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading && !error && products.length > 0 ? (
        <Grid>
          {visibleItems.map((item: RankedProduct) => (
            <ProductCard
              key={item.ranking}
              item={item}
              onClickItem={onClickItem}
            />
          ))}
        </Grid>
      ) : (
        <EmptyMessage>상품이 없습니다.</EmptyMessage>
      )}

      {/* 더보기 / 접기 버튼 */}
      <ToggleButton onClick={toggleExpand}>
        {isExpanded ? '접기' : '더보기'}
      </ToggleButton>
    </>
  );
};

export default ProductGrid;

interface CardProps {
  item: RankedProduct;
  onClickItem: (item: RankedProduct) => void;
}
const ProductCard = ({ item, onClickItem }: CardProps) => {
  return (
    <Card>
      <ImageWrapper onClick={() => onClickItem(item)}>
        <ProductImage src={item.imageURL} alt={item.name} />
        <RankBadge>{item.ranking}</RankBadge>
      </ImageWrapper>
      <Brand>{item.brandInfo.name}</Brand>
      <ProductName>{item.name}</ProductName>
      <Price>{item.price.sellingPrice.toLocaleString()} 원</Price>
    </Card>
  );
};

const Grid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing.spacing4,
}));

const Card = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const RankBadge = styled.div(({ theme }) => ({
  position: 'absolute',
  top: '6px',
  left: '6px',
  backgroundColor: theme.colors.red.red700,
  color: '#fff',
  padding: '2px 6px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 'bold',
}));

const Brand = styled.p(({ theme }) => ({
  marginTop: theme.spacing.spacing2,
  fontSize: theme.typography.label2Regular.fontSize,
  color: theme.colors.gray.gray600,
}));

const ProductName = styled.p(({ theme }) => ({
  fontWeight: theme.typography.body2Bold.fontWeight,
  fontSize: theme.typography.body2Bold.fontSize,
  margin: 0,
}));

const Price = styled.p(({ theme }) => ({
  marginTop: '4px',
  fontWeight: theme.typography.body2Bold.fontWeight,
  fontSize: theme.typography.body2Bold.fontSize,
}));

const ToggleButton = styled.button(({ theme }) => ({
  display: 'block',
  margin: `${theme.spacing.spacing4} auto 0`,
  marginTop: theme.spacing.spacing4,
  padding: `${theme.spacing.spacing3} ${theme.spacing.spacing10}`,
  border: `1px solid ${theme.colors.gray.gray300}`,
  background: 'white',
  color: theme.colors.gray.gray800,
  borderRadius: '8px',
  fontSize: theme.typography.body2Regular.fontSize,
  cursor: 'pointer',
  fontWeight: 500,
}));
