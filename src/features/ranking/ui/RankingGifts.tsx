import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GiftCard, GiftCardGrid } from "@/entities/gift/ui";

import { useRankingGifts } from "@/features/ranking/services/getRankingGifts";

import { Button } from "@/shared/ui";
import { Spinner } from "@/shared/ui/Spinner.styled";

export const RankingGifts = () => {
    const navigate = useNavigate();

    const [showAll, setShowAll] = useState<boolean>(false);
    const { isPending, data } = useRankingGifts();

    if (isPending) {
        return (
            <GiftCardGrid>
                <Spinner size="40px" borderWidth="4px" color="#000" />
            </GiftCardGrid>
        );
    }

    if (!data || data.length === 0) {
        return <GiftCardGrid>상품이 없습니다</GiftCardGrid>;
    }

    const displayedData = showAll ? data : data.slice(0, 6);
    const hasMore = data.length > 6;

    return (
        <div>
            <GiftCardGrid>
                {displayedData.map((gift, index) => {
                    return (
                        <GiftCard
                            index={index + 1}
                            key={gift.id}
                            id={gift.id}
                            name={gift.name}
                            imageURL={gift.imageURL}
                            price={gift.price}
                            brandInfo={gift.brandInfo}
                            onClick={() => navigate(`/order/${gift.id}`)}
                        />
                    );
                })}
            </GiftCardGrid>

            {hasMore && !showAll && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button
                        variant="secondary"
                        width="120px"
                        height="40px"
                        onClick={() => setShowAll(true)}
                    >
                        더보기
                    </Button>
                </div>
            )}
        </div>
    );
};
