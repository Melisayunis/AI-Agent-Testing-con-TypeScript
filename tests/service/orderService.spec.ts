import { test, expect } from '@playwright/test';

import { getOrderById } from '../../src/services/orderService';

test.describe('Order Service', () => {

    test('should return an order by ID', () => {

        const order = getOrderById(123);

        expect(order).toBeDefined();
        expect(order?.id).toBe(123);
        expect(order?.status).toBe('Pending');
    });

    test('should return undefined when the order does not exist', () => {

        const order = getOrderById(999);

        expect(order).toBeUndefined();
    });

});