export const orderAgentScenarios = [
    {
        name: 'Order status',
        input: 'What is the status of order 123?',
        expectedTools: [
            {
                name: 'getOrder',
                arguments: {
                    orderId: 123,
                },
            },
        ],
        expectedAnswer: ['Pending'],
    },

    {
        name: 'Order owner',
        input: 'Who owns order 123?',
        expectedTools: [
            {
                name: 'getOrder',
                arguments: {
                    orderId: 123,
                },
            },
            {
                name: 'getCustomer',
                arguments: {
                    customerId: 1,
                },
            },
        ],
        expectedAnswer: ['John Doe'],
    },

    {
        name: 'Pending order investigation',
        input: 'Why is order 123 still pending?',
        expectedTools: [
            {
                name: 'getOrder',
                arguments: {
                    orderId: 123,
                },
            },
            {
                name: 'getPayment',
                arguments: {
                    paymentId: 1001,
                },
            },
        ],
        expectedAnswer: ['Failed'],
    },

    {
        name: 'Order summary',
        input: 'Give me a complete summary of order 123.',
        expectedTools: [
            {
                name: 'getOrder',
                arguments: {
                    orderId: 123,
                },
            },
            {
                name: 'getCustomer',
                arguments: {
                    customerId: 1,
                },
            },
            {
                name: 'getPayment',
                arguments: {
                    paymentId: 1001,
                },
            },
        ],
        expectedAnswer: ['John Doe', 'Pending', 'Failed'],
    },

    {
        name: 'Customer orders',
        input: 'What orders belong to customer 1?',
        expectedTools: [
            {
                name: 'getOrdersByCustomer',
                arguments: {
                    customerId: 1,
                },
            },
        ],
        expectedAnswer: ['123'],
    },

    {
        name: 'Missing order',
        input: 'What is the status of order 999?',
        expectedTools: [
            {
                name: 'getOrder',
                arguments: {
                    orderId: 999,
                },
            },
        ],
        expectedAnswerPatterns: [
            /not exist|couldn.?t find|no information/i,
        ],
    },

    {
        name: 'Missing order ID',
        input: 'What is the status of my order?',
        expectedTools: [],
        expectedAnswer: ['order id'],
    },

    {
        name: 'No unnecessary tools',
        input: 'Hello, how are you?',
        expectedTools: [],
        expectedAnswer: [],
    },

    {
        name: 'No hallucinated tracking number',
        input: 'What is the tracking number for order 123?',
        expectedTools: [
            {
                name: 'getOrder',
                arguments: {
                    orderId: 123,
                },
            },
        ],
        expectedAnswer: ['tracking number'],
    },
];