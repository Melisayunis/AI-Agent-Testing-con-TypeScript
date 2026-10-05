import { test, expect } from '@playwright/test';

import { getCustomerById } from '../../src/services/customerService';

test.describe('Customer Service', () => {

    test('should return a customer by ID', () => {

        const customer = getCustomerById(1);

        expect(customer).toBeDefined();
        expect(customer?.id).toBe(1);
        expect(customer?.name).toBe('John Doe');
    });

    test('should return undefined when the customer does not exist', () => {

        const customer = getCustomerById(999);

        expect(customer).toBeUndefined();
    });

});