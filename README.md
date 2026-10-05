# AI-Agent-Testing-con-TypeScript

An AI-powered order support agent built with **TypeScript, OpenAI Responses API, and Playwright**.

The project focuses on designing and testing an AI agent that can select and execute tools to retrieve order-related information and handle multi-step workflows.

## What it demonstrates

- Tool selection and argument validation
- Multi-step agent workflows
- Grounded responses based on tool results
- Hallucination prevention
- Handling missing or unavailable information
- Behavioral testing with Playwright

## Tech Stack

- TypeScript
- OpenAI Responses API
- Playwright
- Node.js

## Architecture

```text
User
 ↓
AI Agent
 ↓
Tools
 ↓
Services
 ↓
Mock Data
```

The Services layer is intentionally separated from the tools so the mock data can later be replaced by a REST API without changing the agent logic.

## Testing

The agent is tested with Playwright to validate both individual tool behavior and end-to-end agent behavior, including tool selection, arguments, multi-tool workflows, and grounded responses.

> Designed and tested an AI agent using Playwright, validating tool selection, tool arguments, multi-step workflows, grounded responses, and hallucination prevention.