import { getPaymentById } from '../../services/paymentService';
import { Payment } from '../../types/payment';

export function getPayment(paymentId: number): Payment | undefined {
    return getPaymentById(paymentId);
}

export const getPaymentTool = {
    type: 'function' as const,
    name: 'getPayment',
    description: 'Get information about a payment using its payment ID.',
    parameters: {
        type: 'object',
        properties: {
            paymentId: {
                type: 'number',
                description: 'The ID of the payment to retrieve.',
            },
        },
        required: ['paymentId'],
        additionalProperties: false,
    },
};
