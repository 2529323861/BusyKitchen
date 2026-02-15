import { BaseUIComponent } from '../BaseUIComponent';
import { EntryState, OrderEntry } from './OrderEntry';

export interface EntryConfig {
  name: string;
  image: GamePictureAssets;
  maxTime: number;
  nowTime: number;
}

export class OrderList extends BaseUIComponent {
  /** 场景中节点绑定 */
  private _orderList: UiNode;

  /** 订单条目模板 */
  private _orderEntryTemplate: UiNode;

  /** 当前活跃中的条目数组 */
  private orderEntryList: OrderEntry[] = [];

  /** 删除中的条目数组 */
  private orderEntryListDeleted: OrderEntry[] = [];

  constructor(orderList: UiNode) {
    super();
    this._orderList = orderList;
    this._orderEntryTemplate = orderList.findChildByName(
      'order_template'
    ) as UiNode;
  }

  public init(): void {
    console.log('OrderList init');
  }

  public start(): void {
    console.log('OrderList start');
  }

  public update(delta: number): void {
    this.orderEntryList.forEach((value) => {
      value.update(delta);
    });
    this.orderEntryListDeleted.forEach((value) => {
      value.update(delta);
    });
    /** 移除维护所有已经完成删除动画的节点 */
    this.orderEntryListDeleted = this.orderEntryListDeleted.filter((value) => {
      return value.state !== EntryState.Destoried;
    });
  }

  public destory(): void {
    console.log('OrderList destory');
    this.orderEntryList.forEach((value) => {
      value.destory();
    });
  }

  /** 外部可调用的增加条目 */
  public addEntry(config: EntryConfig): void {
    if (this.orderEntryList.length < 6) {
      const orderEntry = this._orderEntryTemplate.clone();
      orderEntry.parent = this._orderList;
      const orderEntryComponent = new OrderEntry(
        orderEntry,
        this.orderEntryList.length,
        config
      );
      this.orderEntryList.push(orderEntryComponent);
      orderEntryComponent.init();
      orderEntryComponent.start();
    }
  }

  /** 外部可调用的删除条目 */
  public removeEntry(index: number): void {
    /** 将目标条目加入删除中数组进行独立维护 */
    this.orderEntryListDeleted.push(this.orderEntryList[index]);
    /** 调用删除方法 */
    this.orderEntryList[index]?.delelete();
    /** 从活跃数组中移除 */
    this.orderEntryList.splice(index, 1);
    console.log(
      `(client): 活跃条目长度 ${this.orderEntryList.length} ; 当前删除索引 ${index}`
    );
    /** 更新其余所有条目的位置 */
    this.orderEntryList.forEach((value, idx) => {
      value.changeIndex(idx);
    });
  }

  get orderListLength() {
    return this.orderEntryList.length;
  }
}
