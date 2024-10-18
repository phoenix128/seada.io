export interface IOrderData {
    id: string;
    currency: string;
    orderNumber: string;
    orderDate: string;
    status: string;
    total: number;
}

export interface IOrderItemData {
    productId: string;
    quantity: number;
}

export interface IOrdersListData {
    orders: IOrderData[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}
