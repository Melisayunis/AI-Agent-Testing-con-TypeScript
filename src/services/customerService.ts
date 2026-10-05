import { mockCustomers } from '../data/mockCustomers';
import { Customer } from '../types/customer';

export function getCustomerById(customerId: number): Customer | undefined {
    return mockCustomers.find(customer => customer.id === customerId);
}