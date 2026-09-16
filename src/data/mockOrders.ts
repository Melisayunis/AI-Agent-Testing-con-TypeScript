import { Order } from '../types/order';

export const mockOrders: Order[] = [
    {
        id: 123,
        status: 'Pending',
        total: 250,
        currency: 'USD',
    },
    {
        id: 456,
        status: 'Completed',
        total: 100,
        currency: 'USD',
    },
    {
        id: 789,
        status: 'Cancelled',
        total: 75,
        currency: 'EUR',
    },
];