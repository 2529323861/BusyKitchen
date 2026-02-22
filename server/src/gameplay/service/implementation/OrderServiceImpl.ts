import type { OrderMgr } from '../../mgr/OrderMgr';
import type { IOrderService } from '../interface/IOrderService';

export class OrderServieImpl implements IOrderService {
  constructor(private ordermgr: OrderMgr) {}
  deliverOrder(item: string): boolean {
    return this.ordermgr.deliverOrder(item);
  }
}
