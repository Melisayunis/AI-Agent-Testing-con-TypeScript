import { test, expect } from '@playwright/test';
import { runOrderAgent } from '../../src/agent/orderAgent';

test.describe('Order History', () => {

    test('should retrieve orders for a customer', async () => {

        const result = await runOrderAgent(
            'What orders belong to customer 1?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrdersByCustomer',
            arguments: {
                customerId: 1,
            },
        });

        expect(result.answer).toContain('123');
    });

    test('should handle a customer with no orders', async () => {

        const result = await runOrderAgent(
            'What orders belong to customer 999?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrdersByCustomer',
            arguments: {
                customerId: 999,
            },
        });

        expect(result.answer.toLowerCase()).toMatch(
            /no orders|does not have|couldn.?t find/
        );
    });

    test('should not invent orders for a non-existing customer', async () => {

        const result = await runOrderAgent(
            'Show me the orders for customer 999.'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrdersByCustomer',
            arguments: {
                customerId: 999,
            },
        });

        expect(result.answer.toLowerCase()).toMatch(
            /no orders|does not have|couldn.?t find|not exist/
        );

        expect(result.answer).not.toContain('123');
        expect(result.answer).not.toContain('456');
        expect(result.answer).not.toContain('789');
    });

    test('should retrieve the customer and their orders in a multi-step workflow', async () => {

        const result = await runOrderAgent(
            'Who owns order 123 and what other orders have they placed?'
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
            name: 'getOrdersByCustomer',
            arguments: {
                customerId: 1,
            },
        });

        expect(result.answer).toContain('John Doe');
        expect(result.answer).toContain('123');
    });

});

test.describe('Order Agent Behavioral Tests', () => {

    test('should select the correct tool for retrieving customer orders', async () => {

        const result = await runOrderAgent(
            'What orders belong to customer 1?'
        );

        expect(result.toolCalls).toHaveLength(1);

        expect(result.toolCalls[0]).toEqual({
            name: 'getOrdersByCustomer',
            arguments: {
                customerId: 1,
            },
        });
    });

    test('should use the correct customer ID when retrieving orders', async () => {

        const result = await runOrderAgent(
            'Show me the orders for customer 2.'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrdersByCustomer',
            arguments: {
                customerId: 2,
            },
        });
    });

    test('should not use unnecessary tools', async () => {

        const result = await runOrderAgent(
            'What orders belong to customer 1?'
        );

        expect(result.toolCalls).toHaveLength(1);
    });

    test('should ground the response in tool results', async () => {

        const result = await runOrderAgent(
            'What orders belong to customer 1?'
        );

        expect(result.answer).toContain('123');
    });

    test('should not invent information when no orders are found', async () => {

        const result = await runOrderAgent(
            'What orders belong to customer 999?'
        );

        expect(result.toolCalls).toContainEqual({
            name: 'getOrdersByCustomer',
            arguments: {
                customerId: 999,
            },
        });

        expect(result.answer).not.toContain('123');
        expect(result.answer).not.toContain('456');
        expect(result.answer).not.toContain('789');
    });

});