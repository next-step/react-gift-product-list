import { useParams } from "react-router-dom";

import { useGetGiftListByCursorBasedPagination } from "@/entities/gift/services/getGiftList";
import { GiftCard, GiftCardGrid } from "@/entities/gift/ui";

import { ThemeInfoBanner } from "@/features/theme/ui/ThemeInfoBanner";

import { Spinner } from "@/shared/ui/Spinner";

import * as Styles from "./ThemeListPage.styled";

export default function ThemeListPage() {
    const { id } = useParams();

    const { items, isPending, error, hasMore, loadMoreRef } = useGetGiftListByCursorBasedPagination(
        Number(id),
    );

    if (error) {
        return <div>Error: {String(error)}</div>;
    }

    return (
        <>
            <ThemeInfoBanner />

            <Styles.Container>
                <GiftCardGrid>
                    {items.map((item, index) => (
                        <GiftCard
                            key={item.id}
                            index={index}
                            id={item.id}
                            name={item.name}
                            imageURL={item.imageURL}
                            price={item.price}
                            brandInfo={item.brandInfo}
                        />
                    ))}

                    {hasMore && (
                        <div ref={loadMoreRef} style={{ height: "20px", margin: "20px 0" }}>
                            {isPending && <Spinner />}
                        </div>
                    )}

                    {!hasMore && items.length > 0 && (
                        <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                            모든 상품을 불러왔습니다.
                        </div>
                    )}
                </GiftCardGrid>
            </Styles.Container>
        </>
    );
}
