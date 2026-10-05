
import { mockPayments } from '../data/mockPayments';
import { Payment } from '../types/payment';

export function getPaymentById(paymentId: number): Payment | undefined {
    return mockPayments.find(payment => payment.id === paymentId);
}