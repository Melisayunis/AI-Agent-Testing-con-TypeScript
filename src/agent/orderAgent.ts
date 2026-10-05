import OpenAI from 'openai';
import 'dotenv/config';

import { ORDER_AGENT_SYSTEM_PROMPT } from './prompts';
import { getOrder } from '../tools/orders/getOrder';
import { getCustomer } from '../tools/customer/getCustomer';
import { getPayment } from '../tools/payments/getPayment';
import { getOrdersByCustomer } from '../tools/orders/getOrderByCustomer';
import { tools } from '../tools/toolRegistry';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


function executeTool(
    toolName: string,
    argumentsParsed: Record<string, number>
) {
    switch (toolName) {
        case 'getOrder':
            return getOrder(argumentsParsed.orderId);

        case 'getCustomer':
            return getCustomer(argumentsParsed.customerId);

        case 'getPayment':
            return getPayment(argumentsParsed.paymentId);

        case 'getOrdersByCustomer':
            return getOrdersByCustomer(argumentsParsed.customerId);

        default:
            throw new Error(`Unknown tool: ${toolName}`);
    }
}

export async function runOrderAgent(userMessage: string) {
    let iterations = 0;
    const maxIterations = 5;

    let response = await openai.responses.create({
        model: 'gpt-5.4-mini',
        instructions: ORDER_AGENT_SYSTEM_PROMPT,
        input: userMessage,
        tools,
        tool_choice: 'auto',
    });

    const toolCalls: {
        name: string;
        arguments: Record<string, number>;
    }[] = [];

    while (iterations < maxIterations) {

        const functionCalls = response.output.filter(
            item => item.type === 'function_call'
        );

        if (functionCalls.length === 0) {
            return {
                answer: response.output_text,
                toolCalls,
            };
        }

        const toolOutputs = functionCalls.map(toolCall => {

            const argumentsParsed = JSON.parse(toolCall.arguments);

            toolCalls.push({
                name: toolCall.name,
                arguments: argumentsParsed,
            });

            const result = executeTool(
                toolCall.name,
                argumentsParsed
            );

            return {
                type: 'function_call_output' as const,
                call_id: toolCall.call_id,
                output: JSON.stringify(result ?? null),
            };
        });

        response = await openai.responses.create({
            model: 'gpt-5.4-mini',
            instructions: ORDER_AGENT_SYSTEM_PROMPT,
            previous_response_id: response.id,
            tools,
            input: toolOutputs,
        });
        iterations++;
    }
    throw new Error('Max iterations reached without completing the response.');
}
