import { test, expect } from '@playwright/test';
import { runOrderAgent } from '../../src/agent/orderAgent';

test.describe('Order Agent', () => {

    test('should use getOrder for an order status request', async () => {

        const result = await runOrderAgent(
            'What is the status of order 123?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 123,
            },
        });

        expect(result.answer).toContain('Pending');
    });

    test('should retrieve a completed order', async () => {

        const result = await runOrderAgent(
            'What is the status of order 456?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 456,
            },
        });

        expect(result.toolCalls).toHaveLength(1);

        expect(result.answer).toContain('Completed');
    });

    test('should handle a non-existing order without inventing information', async () => {

        const result = await runOrderAgent(
            'What is the status of order 999?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 999,
            },
        });

        expect(result.toolCalls).toHaveLength(1);

        expect(result.answer.toLowerCase()).toMatch(
            /not exist|couldn.?t find|no information/
        );
    });

    test('should retrieve the customer when asked who owns an order', async () => {

        const result = await runOrderAgent(
            'Who owns order 123?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 123,
            },
        });

        expect(result.toolCalls).toContainEqual({
            name: 'getCustomer',
            arguments: {
                customerId: 1,
            },
        });

        expect(result.answer).toContain('John Doe');
    });

    test('should retrieve payment information when investigating a pending order', async () => {

        const result = await runOrderAgent(
            'Why is order 123 still pending?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 123,
            },
        });

        expect(result.toolCalls).toContainEqual({
            name: 'getPayment',
            arguments: {
                paymentId: 1001,
            },
        });

        expect(result.answer).toContain('Failed');
    });

    test('should ask for the order ID when it is not provided', async () => {

        const result = await runOrderAgent(
            'What is the status of my order?'
        );

        expect(result.toolCalls).toHaveLength(0);

        expect(result.answer.toLowerCase()).toMatch(
            /order id|order number|provide/
        );
    });

    test('should retrieve all related information for an order summary', async () => {

        const result = await runOrderAgent(
            'Give me a complete summary of order 123.'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 123,
            },
        });

        expect(result.toolCalls).toContainEqual({
            name: 'getCustomer',
            arguments: {
                customerId: 1,
            },
        });

        expect(result.toolCalls).toContainEqual({
            name: 'getPayment',
            arguments: {
                paymentId: 1001,
            },
        });

        expect(result.answer).toContain('John Doe');
        expect(result.answer).toContain('Pending');
        expect(result.answer).toContain('Failed');
    });


    test('should trust retrieved order information over user assumptions', async () => {

        const result = await runOrderAgent(
            'Order 123 is completed, right?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 123,
            },
        });

        expect(result.answer).toContain('Pending');
    });

    test('should not invent a tracking number that is not available', async () => {

        const result = await runOrderAgent(
            'What is the tracking number for order 123?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrder',
            arguments: {
                orderId: 123,
            },
        });

        expect(result.answer.toLowerCase()).toMatch(
            /not available|no information|don.?t have|couldn.?t find|does not include.*tracking number|no tracking number|does not show.*tracking number/
        );
    });


    test('should not use tools when the order ID is invalid', async () => {

        const result = await runOrderAgent(
            'What is the status of order ABC?'
        );

        expect(result.toolCalls).toHaveLength(0);
    });

    test('should not use tools for a greeting', async () => {

        const result = await runOrderAgent(
            'Hello, how are you?'
        );

        expect(result.toolCalls).toHaveLength(0);
    });

    test('should not use tools for a weather inquiry', async () => {

        const result = await runOrderAgent(
            "What is the weather today?"
        );

        expect(result.toolCalls).toHaveLength(0);
    });

});
