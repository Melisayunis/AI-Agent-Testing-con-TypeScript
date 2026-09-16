import { test, expect } from '@playwright/test';

import { runOrderAgent } from '../../src/agent/orderAgent';

test.describe('Order Agent', () => {

    test('should use getOrder with the correct order ID', async () => {

        const result = await runOrderAgent(
            'What is the status of order 123?'
        );

        expect(result.toolName).toBe('getOrder');
        expect(result.toolArguments.orderId).toBe(123);
    });

    test('should return information based on the retrieved order', async () => {

        const result = await runOrderAgent(
            'What is the status of order 123?'
        );

        expect(result.answer).toContain('Pending');
    });

    test('should handle a non-existing order without inventing information', async () => {

        const result = await runOrderAgent(
            'What is the status of order 999?'
        );

        expect(result.toolName).toBe('getOrder');
        expect(result.toolArguments.orderId).toBe(999);

        expect(result.answer.toLowerCase()).toMatch(
            /not exist|couldn.?t find|no information/
        );
    });

});