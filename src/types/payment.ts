export interface Payment {
    id: number;
    orderId: number;
    status: 'Pending' | 'Completed' | 'Failed';
    amount: number;
    currency: string;
}