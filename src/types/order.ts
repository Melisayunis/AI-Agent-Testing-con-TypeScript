export interface Order {
    id: number;
    customerId: number;
    status: 'Pending' | 'Completed' | 'Cancelled';
    total: number;
    currency: string;
    paymentId: number;
}