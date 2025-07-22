type BaseResponse<T> = {
    data: T;
};

type BaseErrorResponse = BaseResponse<{
    status: string;
    statusCode: number;
    message: string;
}>;

type BasePaginatedResponse<T, K extends string> = {
    data: {
        [key in K]: T[];
    } & {
        cursor: number;
        hasMoreList: boolean;
    };
};
