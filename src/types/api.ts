export interface Theme {
    themeId: number,
    name: string,
    image: string,
}

export interface ThemeInfo {
    themeId: number;
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

export interface ThemeProductsResponse {
    list: RankingProduct[];
    cursor: number;
    hasMoreList: boolean;
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

export interface ProductSummary {
    id: number;
    name: string;
    brandName: string;
    price: number;
    imageURL: string;
}

export interface OrderRequest {
    productId: number;
    message: string;
    messageCardId: string;
    ordererName: string;
    receivers: {
        name: string;
        phoneNumber: string;
        quantity: number;
    }[];
}

export interface OrderResponse {
    success: boolean;
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

// 에러 관련 타입 정의
export interface ApiErrorData {
    status: string;
    statusCode: number;
    message: string;
}

export interface ApiErrorResponse {
    data: ApiErrorData;
}

export interface AxiosErrorResponse {
    response?: {
        status: number;
        data: ApiErrorResponse;
    };
    message: string;
}
