import { Order } from '../../types/order';
import { getOrderById } from '../../services/orderService';

export function getOrder(orderId: number): Order | undefined {
    return getOrderById(orderId);
}

export const getOrderTool = {
    type: 'function' as const,
    name: 'getOrder',
    description: 'Get information about an order using its order ID.',
    parameters: {
        type: 'object',
        properties: {
            orderId: {
                type: 'number',
                description: 'The ID of the order to retrieve.',
            },
        },
        required: ['orderId'],
        additionalProperties: false,
    },
};
