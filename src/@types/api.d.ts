type BaseResponse<T> = {
    data: T;
};

type BaseErrorResponse = BaseResponse<{
    status: string;
    statusCode: number;
    message: string;
}>;
