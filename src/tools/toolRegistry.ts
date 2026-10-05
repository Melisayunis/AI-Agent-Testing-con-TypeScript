import { getOrderTool } from './orders/getOrder';
import { getCustomerTool } from './customer/getCustomer';
import { getPaymentTool } from './payments/getPayment';
import { getOrdersByCustomerTool } from './orders/getOrderByCustomer';

export const tools = [
    getOrderTool,
    getCustomerTool,
    getPaymentTool,
    getOrdersByCustomerTool,
];