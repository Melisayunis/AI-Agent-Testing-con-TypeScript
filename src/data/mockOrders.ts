import { Order } from '../types/order';

export const mockOrders: Order[] = [
    {
        id: 123,
        customerId: 1,
        status: 'Pending',
        total: 250,
        currency: 'USD',
        paymentId: 1001,
    },
    {
        id: 456,
        customerId: 2,
        status: 'Completed',
        total: 100,
        currency: 'USD',
        paymentId: 1002,
    },
    {
        id: 789,
        customerId: 3,
        status: 'Cancelled',
        total: 75,
        currency: 'EUR',
        paymentId: 1003,
    },
];