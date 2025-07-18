import { GiftCategoryGrid, GiftCategoryItem } from "@/entities/gift/ui";

import { useGiftThemes } from "@/features/theme/services/getGiftThemes";

import { Spinner } from "@/shared/ui/Spinner";

export const GiftThemes = () => {
    const { isPending, data, error } = useGiftThemes();

    if (isPending) {
        return (
            <GiftCategoryGrid>
                <Spinner size="40px" borderWidth="4px" color="#000" />
            </GiftCategoryGrid>
        );
    }

    if (error) {
        return <GiftCategoryGrid>에러 발생</GiftCategoryGrid>;
    }

    return (
        <GiftCategoryGrid>
            {data &&
                data.map((category) => {
                    return (
                        <GiftCategoryItem
                            key={category.themeId}
                            imgSrc={category.image}
                            label={category.name}
                        />
                    );
                })}
        </GiftCategoryGrid>
    );
};
