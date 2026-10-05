import { Payment } from '../types/payment';

export const mockPayments: Payment[] = [
    {
        id: 1001,
        orderId: 123,
        status: 'Failed',
        amount: 250,
        currency: 'USD',
    },
    {
        id: 1002,
        orderId: 456,
        status: 'Completed',
        amount: 100,
        currency: 'USD',
    },
    {
        id: 1003,
        orderId: 789,
        status: 'Failed',
        amount: 75,
        currency: 'EUR',
    },
];