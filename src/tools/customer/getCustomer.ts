import { getCustomerById } from '../../services/customerService';
import { Customer } from '../../types/customer';

export function getCustomer(customerId: number): Customer | undefined {
    return getCustomerById(customerId);
}

export const getCustomerTool = {
    type: 'function' as const,
    name: 'getCustomer',
    description: 'Get information about a customer using their customer ID.',
    parameters: {
        type: 'object',
        properties: {
            customerId: {
                type: 'number',
                description: 'The ID of the customer to retrieve.',
            },
        },
        required: ['customerId'],
        additionalProperties: false,
    },
};