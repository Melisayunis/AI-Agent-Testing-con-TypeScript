import { test, expect } from '@playwright/test';

import { getOrder } from '../../src/tools/orders/getOrder';

test.describe('getOrder Tool', () => {

    test('should return the requested order', () => {

        const order = getOrder(123);

        expect(order).toBeDefined();
        expect(order?.id).toBe(123);
        expect(order?.status).toBe('Pending');
    });

    test('should return undefined when the order does not exist', () => {

        const order = getOrder(999);

        expect(order).toBeUndefined();
    });

});