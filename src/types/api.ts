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

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    email: string;
    name: string;
    authToken: string;
}

export interface ApiResponse<T> {
    data: T;
}
