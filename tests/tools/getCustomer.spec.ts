import { test, expect } from '@playwright/test';
import { getCustomer } from '../../src/tools/customer/getCustomer';

test.describe('getCustomer Tool', () => {

    test('should return the requested customer', () => {

        const customer = getCustomer(1);

        expect(customer).toBeDefined();
        expect(customer?.id).toBe(1);
        expect(customer?.name).toBe('John Doe');
    });

    test('should return undefined when the customer does not exist', () => {

        const customer = getCustomer(999);

        expect(customer).toBeUndefined();
    });

});