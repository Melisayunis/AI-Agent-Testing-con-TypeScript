import { test, expect } from '@playwright/test';

import { runOrderAgent } from '../../src/agent/orderAgent';

import { orderAgentScenarios } from './scenarios';

test.describe('Order Agent Evaluation', () => {

    for (const scenario of orderAgentScenarios) {

        test(scenario.name, async () => {
            const result = await runOrderAgent(
                scenario.input
            );

            expect(result.toolCalls).toEqual(
                expect.arrayContaining(scenario.expectedTools)
            );

            expect(result.toolCalls).toHaveLength(
                scenario.expectedTools.length
            );

            if (scenario.expectedAnswer) {
                for (const expectedAnswer of scenario.expectedAnswer) {
                    expect(result.answer.toLowerCase()).toContain(
                        expectedAnswer.toLowerCase()
                    );
                }
            }

            if (scenario.expectedAnswerPatterns) {
                for (const pattern of scenario.expectedAnswerPatterns) {
                    expect(result.answer).toMatch(pattern);
                }
            }
        });
    }

});
