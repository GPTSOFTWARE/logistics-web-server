
export interface IProduct {
    id: number;

    name: string;

    price: number;

    quantity: number;

    thumbnails: string;

    description: string;

    // SOHs: SaleOrderHeader[];
}
export interface IPagingUserResponse {
    data: IProduct[];
    total: number;
}
