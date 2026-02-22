export interface IOrderService {
  /** 交付订单 */
  deliverOrder(item: string): boolean;
}
