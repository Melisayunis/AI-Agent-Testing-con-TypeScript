import { mockOrders } from '../../data/mockOrders';
import { Order } from '../../types/order';

export function getOrder(orderId: number): Order | undefined {
    return mockOrders.find(order => order.id === orderId);
}