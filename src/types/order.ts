export interface Order {
    id: number;
    status: 'Pending' | 'Completed' | 'Cancelled';
    total: number;
    currency: string;
}
