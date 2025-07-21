import { useState } from 'react';
import {
    BrandImage,
    LoadMoreButton,
    LoadMoreButtonDiv,
    Price,
    ProductCard,
    ProductGrid,
    ProductImage,
    ProductInfo,
} from './GiftRanking.styled';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { ProductItem } from '@/type/product';
import { Spinner, SpinnerWrapper } from './GiftTheme.styled';
import type { RankType, TargetType } from '@/type/giftRanking';
import { CentorAlignDiv240, EmptyDiv16h } from '@/styles/Common.styled';
import useFetchFromUrl from '@/hook/useFetchFromUrl';

const baseRankingUrl = 'http://localhost:3000/api/products/ranking'


interface GiftRankingListProps {
    targetType: TargetType;
    rankType: RankType;
}

const GIFTLENGTH = 6;


const GiftRankingList = ({ targetType, rankType }: GiftRankingListProps) => {
    const RankingUrl = `${baseRankingUrl}?targetType=${targetType}&rankType=${rankType}`
    const [isExpanded, setIsExpanded] = useState(false);
    const {item ,loding,error} = useFetchFromUrl(RankingUrl);
    const { user } = useAuth();
    const navigate = useNavigate();

    const visibleCount = isExpanded ? item.length : GIFTLENGTH;
    const shownProducts = (item as ProductItem[]).slice(0, visibleCount);

    const handleClickProduct = (item: ProductItem) => {
        if (!user) {
            navigate(`/login?redirect=/order?id=${item.id}`);
        } else {
            navigate(`/order?id=${item.id}`);
        }
    };


    if (error) return null

    if (item === null || loding) return (
        <SpinnerWrapper>
            <Spinner />
        </SpinnerWrapper>
    )
    if (!item || item.length === 0) return (
        <CentorAlignDiv240>
            <p>상품이 없습니다</p>
        </CentorAlignDiv240>
    )
    return (
        <>
            <ProductGrid>
                {shownProducts.map((item) => (
                    <ProductCard
                        key={item.id}
                        onClick={() => handleClickProduct(item)}
                    >
                        <ProductImage src={item.imageURL} alt={item.name} />
                        <BrandImage
                            src={item.brandInfo.imageURL}
                            alt={item.brandInfo.name}
                        />
                        <ProductInfo title={item.name}>{item.name}</ProductInfo>
                        <Price>{item.price.sellingPrice.toLocaleString()} 원</Price>
                    </ProductCard>
                ))}
            </ProductGrid>
            <EmptyDiv16h />
            <LoadMoreButtonDiv>
                {item.length > GIFTLENGTH && (
                    <LoadMoreButton onClick={() => setIsExpanded((prev) => !prev)}>
                        <p>
                        {isExpanded ? '접기' : '더보기'}
                        </p>
                    </LoadMoreButton>
                )}
            </LoadMoreButtonDiv>

            <EmptyDiv16h />
        </>
    )
};
export default GiftRankingList;