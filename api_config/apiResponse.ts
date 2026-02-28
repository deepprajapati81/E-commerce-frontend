export type ApiResponse<T> = {
    success: boolean;
    error: any;
    status: number;
    data?: undefined;
} | {
    success: boolean;
    data:T;
    status: number;
    error?: undefined;
}