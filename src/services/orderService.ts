import { mockOrders } from '../data/mockOrders';

export function getOrderById(orderId: number) {
    return mockOrders.find(order => order.id === orderId);
}