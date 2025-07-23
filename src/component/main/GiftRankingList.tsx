import { useState } from 'react';
import {
    LoadMoreButton,
    LoadMoreButtonDiv,
} from './GiftRanking.styled';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { ProductItem } from '@/type/GiftAPI/product';
import type { RankType, TargetType } from '@/type/giftRanking';
import { CentorAlignDiv240, EmptyDiv16h } from '@/styles/CommomStyle/Common.styled';
import { BrandImage, Price, ProductCard, ProductGrid, ProductImage, ProductInfo } from '@/styles/CommomStyle/ProductList';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import Loading from '../Loading';
import { baseRankingUrl } from '@/constant/api';




interface GiftRankingListProps {
    targetType: TargetType;
    rankType: RankType;
}

const GIFTLENGTH = 6;


const GiftRankingList = ({ targetType, rankType }: GiftRankingListProps) => {
    const RankingUrl = `${baseRankingUrl}?targetType=${targetType}&rankType=${rankType}`
    const [isExpanded, setIsExpanded] = useState(false);
    const { item, loading, error } = useFetchFromUrlT<[]>(RankingUrl, []);
    const { user } = useAuth();
    const navigate = useNavigate();

    const visibleCount = isExpanded ? item?.length : GIFTLENGTH;
    const shownProducts = (item as ProductItem[]).slice(0, visibleCount);

    const handleClickProduct = (item: ProductItem) => {
        if (!user) {
            navigate(`/login?redirect=/order?id=${item.id}`);
        } else {
            navigate(`/order?id=${item.id}`);
        }
    };


    if (error) return null

    if (item === null || loading) return (
        <Loading/>
    )
    if (item?.length === 0) return (
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