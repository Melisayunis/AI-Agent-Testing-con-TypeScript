import { test, expect } from '@playwright/test';

import { getPaymentById } from '../../src/services/paymentService';

test.describe('Payment Service', () => {

    test('should return a payment by ID', () => {

        const payment = getPaymentById(1001);

        expect(payment).toBeDefined();
        expect(payment?.id).toBe(1001);
        expect(payment?.status).toBe('Failed');
    });

    test('should return undefined when the payment does not exist', () => {

        const payment = getPaymentById(999);

        expect(payment).toBeUndefined();
    });

});