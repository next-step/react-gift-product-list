import type { PropsWithChildren } from "react";

import * as Styles from "./GiftCategoryGrid.styled";

export const GiftCategoryGrid = ({ children }: PropsWithChildren) => {
    return <Styles.GridWrapper>{children}</Styles.GridWrapper>;
};

export interface GiftCategoryItemProps {
    imgSrc: string;
    label: string;
    onClick?: () => void;
}

export const GiftCategoryItem = ({ imgSrc, label, onClick }: GiftCategoryItemProps) => {
    return (
        <Styles.GridItem onClick={onClick}>
            <Styles.ItemImage src={imgSrc} alt={label} />
            <Styles.ItemLabel>{label}</Styles.ItemLabel>
        </Styles.GridItem>
    );
};
