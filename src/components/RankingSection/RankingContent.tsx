import styled from '@emotion/styled';
import { loading } from '@/components/common/Loading';
import ProductGrid from './ProductGrid';
import ExpandButton from './ExpandButton';
import { ERROR_MESSAGES } from '@/constants/validation';
import type { Product } from '@/types/product';

interface ProductRanking {
  data: Product[] | null;
  pending: boolean;
  error: boolean;
}

interface Props {
  productRanking: ProductRanking;
  visibleCount: number;
  toggleVisibleCount: () => void;
  isExpanded: boolean;
}

const RankingContent = ({
  productRanking,
  visibleCount,
  toggleVisibleCount,
  isExpanded,
}: Props) => {
  const { data, pending, error } = productRanking;

  if (pending) return loading;
  if (error || !data)
    return <EmptyText>{ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS}</EmptyText>;
  if (data.length === 0)
    return <EmptyText>{ERROR_MESSAGES.NO_PRODUCTS_AVAILABLE}</EmptyText>;

  const visibleProducts = isExpanded ? data : data.slice(0, visibleCount);

  return (
    <>
      <ProductGrid products={visibleProducts} />
      <ExpandButton isExpanded={isExpanded} onToggle={toggleVisibleCount} />
    </>
  );
};

export default RankingContent;

const EmptyText = styled.p`
  ${({ theme }) => theme.typography.body.body2Regular};
  color: ${({ theme }) => theme.color.semantic.text};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[6]} 0;
`;
