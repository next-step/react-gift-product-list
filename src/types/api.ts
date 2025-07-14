export interface Theme {
    themeId: number,
    name: string,
    image: string,
}

export interface RankingProduct {
    id: number;
    name: string;
    price: {
        basicPrice: number;
        sellingPrice: number;
        discountRate: number;
    };
    imageURL: string;
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    };
}

export type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
