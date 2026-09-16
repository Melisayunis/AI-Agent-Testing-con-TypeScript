import OpenAI from 'openai';
import 'dotenv/config';

import { ORDER_AGENT_SYSTEM_PROMPT } from './prompts';
import { getOrder } from '../tools/orders/getOrder';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getOrderTool = {
    type: 'function' as const,
    name: 'getOrder',
    description: 'Get information about an order using its order ID.',
    parameters: {
        type: 'object',
        properties: {
            orderId: {
                type: 'number',
                description: 'The ID of the order to retrieve.',
            },
        },
        required: ['orderId'],
        additionalProperties: false,
    },
};

export async function runOrderAgent(userMessage: string) {

    const response = await openai.responses.create({
        model: 'gpt-5.4-mini',
        instructions: ORDER_AGENT_SYSTEM_PROMPT,
        input: userMessage,
        tools: [getOrderTool],
        tool_choice: 'auto',
    });

    const toolCall = response.output.find(
        item => item.type === 'function_call'
    );

    if (!toolCall) {
        console.log(response.output_text);

        return {
            answer: response.output_text,
            toolName: null,
            toolArguments: null,
        };
    }

    const argumentsParsed = JSON.parse(toolCall.arguments);

    const order = getOrder(argumentsParsed.orderId);

    const finalResponse = await openai.responses.create({
        model: 'gpt-5.4-mini',
        instructions: ORDER_AGENT_SYSTEM_PROMPT,
        previous_response_id: response.id,
        tools: [getOrderTool],
        input: [
            {
                type: 'function_call_output',
                call_id: toolCall.call_id,
                output: JSON.stringify(order ?? null),
            },
        ],
    });

    console.log(finalResponse.output_text);

    return {
        answer: finalResponse.output_text,
        toolName: toolCall.name,
        toolArguments: argumentsParsed,
    };
}
