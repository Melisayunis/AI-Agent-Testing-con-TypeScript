import { Order } from '../../types/order';
import { mockOrders } from '../../data/mockOrders';

export function getOrdersByCustomer(customerId: number): Order[] {
    return mockOrders.filter(
        order => order.customerId === customerId
    );
}

export const getOrdersByCustomerTool = {
    type: 'function' as const,
    name: 'getOrdersByCustomer',
    description: 'Get all orders belonging to a customer using their customer ID.',
    parameters: {
        type: 'object',
        properties: {
            customerId: {
                type: 'number',
                description: 'The ID of the customer whose orders should be retrieved.',
            },
        },
        required: ['customerId'],
        additionalProperties: false,
    },
};