import { useEffect, useState } from 'react';
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
import { getFromUrl } from '@/utils/getFromUrl';
import { Spinner, SpinnerWrapper } from './GiftTheme.styled';
import type { RankType, TargetType } from '@/type/giftRanking';
import { CentorAlignDiv240, EmptyDiv16h } from '@/styles/Common.styled';

const baseRankingUrl = 'http://localhost:3000/api/products/ranking'


interface GiftRankingListProps {
    targetType: TargetType;
    rankType: RankType;
}

const GIFTLENGTH = 6;


const GiftRankingList = ({ targetType, rankType }: GiftRankingListProps) => {
    const [Ranking, setThemes] = useState<ProductItem[]>([]);
    const [Loding, setLoding] = useState(true);
    const [Error, setError] = useState(false);

    useEffect(() => {
        const fetchTheme = async () => {
            const rankingUrl = `${baseRankingUrl}?targetType=${targetType}&rankType=${rankType}`
            const Ranking = await getFromUrl(rankingUrl);
            if (Ranking) {
                setThemes(Ranking.data);

            } else {
                setError(true);
            }
            setLoding(false);
        };

        fetchTheme();
    }, [targetType, rankType])

    const { user } = useAuth();
    const navigate = useNavigate();


    const handleClickProduct = (item: ProductItem) => {
        if (!user) {
            navigate(`/login?redirect=/order?id=${item.id}`);
        } else {
            navigate(`/order?id=${item.id}`, { state: { item } });
        }
    };

    const [isExpanded, setIsExpanded] = useState(false);

    const visibleCount = isExpanded ? Ranking.length : GIFTLENGTH;

    const shownProducts = Ranking.slice(0, visibleCount);

    if (Error) return null

    if (Loding) return (
        <SpinnerWrapper>
            <Spinner />
        </SpinnerWrapper>
    )
    if (Ranking.length === 0) return (
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
                {Ranking.length > GIFTLENGTH && (
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