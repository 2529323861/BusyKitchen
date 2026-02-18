import { CommunicationConst } from '../../../../shares/communicationConst';
import { Singleton } from '../../framework/common/Singleton';
import type { IOrdersData } from '../jsonData/DataInterface';
import { CommunicationMgr } from './CommunicationMgr';
import { JsonDataMgr } from './JsonDataMgr';

export class OrderMgr extends Singleton<OrderMgr>() {
  private _active: boolean = false;
  private ordersList: Array<{ time: number; order: IOrdersData }> = [];

  constructor() {
    super();
  }
  public init() {}
  public start() {}
  public update(delta: number) {
    /** 仅在启用状态下更新时间 */
    if (!this._active) {
      return;
    }
    this.ordersList.forEach((value) => {
      value.time -= delta;
    });
    /** 维护超时订单 */
    while (true) {
      let flag = true;
      for (let i = 0; i < this.ordersList.length; i++) {
        if (this.ordersList[i].time <= 0) {
          /** 如果当前列表中有订单超时，则移除该订单 */
          this.ordersList.splice(i, 1);
          /** 移除后需要重新遍历 */
          /** 并广播所有玩家更新UI */
          CommunicationMgr.instance.sendBroad({
            token:
              CommunicationConst.UI_Screen_GamingLogicScreen_OrderList_removeEntry,
            payload: i,
          });
          flag = false;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    /** 根据随机数决定是否下单 */
    if (Math.random() < 0.01) {
      /** 触发下订单 */
      console.log('(server): 触发下订单');
      this.addOrder(JsonDataMgr.instance.getRandomOrder());
    }
  }
  public destroy() {
    OrderMgr.destroyInstance();
  }
  /** 设置启用 */
  public active() {
    this._active = true;
  }
  /** 设置禁用 */
  public inactive() {
    this._active = false;
  }
  /**
   * 添加订单，若已有订单数为6则不响应
   * @param order 要添加的订单
   * @returns
   */
  public addOrder(order: IOrdersData): void {
    /** 仅在启用时添加订单 */
    if (!this._active) {
      return;
    }
    /** 订单总数不超过6 */
    if (this.ordersList.length >= 6) {
      return;
    }
    /** 添加订单 */
    this.ordersList.push({ time: order.time, order: order });
    /** 更新UI */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_Screen_GamingLogicScreen_OrderList_addEntry,
      payload: {
        name: order.name,
        image: order.img,
        maxTime: order.time,
        nowTime: order.time,
      },
    });
  }
  /** 删除订单
   * @param index 要删除的订单索引
   */
  public removeOrder(index: number): void {
    /** 仅在启用时移除订单 */
    if (!this._active) {
      return;
    }
    if (index < this.ordersList.length) {
      this.ordersList.splice(index, 1);
      CommunicationMgr.instance.sendBroad({
        token:
          CommunicationConst.UI_Screen_GamingLogicScreen_OrderList_removeEntry,
        payload: index,
      });
    }
  }
  /**
   * 交付物品
   * @param item 物品的id
   * @returns 若有订单匹配则返回true，否则返回false
   */
  public deliverOrder(item: string): boolean {
    if (!this._active) {
      return false;
    }
    for (let i = 0; i < this.ordersList.length; i++) {
      if (this.ordersList[i].order.item === item) {
        this.ordersList.splice(i, 1);
        CommunicationMgr.instance.sendBroad({
          token:
            CommunicationConst.UI_Screen_GamingLogicScreen_OrderList_removeEntry,
          payload: i,
        });
        return true;
      }
    }
    return false;
  }
  /**
   * 清空订单，用于重置类
   */
  public cleanOrders(): void {
    for (let i = 0; i < this.ordersList.length; i++) {
      CommunicationMgr.instance.sendBroad({
        token:
          CommunicationConst.UI_Screen_GamingLogicScreen_OrderList_removeEntry,
        payload: 0,
      });
    }
    this.ordersList = [];
  }

  /**
   * 获取UI同步用的订单列表
   * @returns 订单列表
   */
  public getClientSyncOrderList(): {
    name: string;
    image: string;
    maxTime: number;
    nowTime: number;
  }[] {
    return this.ordersList.map((value) => {
      return {
        name: value.order.name,
        image: value.order.img,
        maxTime: value.order.time,
        nowTime: value.time,
      };
    });
  }
}
