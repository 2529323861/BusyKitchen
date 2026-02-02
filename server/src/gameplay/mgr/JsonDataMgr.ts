import { Singleton } from '../../framework/common/Singleton';
import type { IItemData } from '../entity/item/BaseItem';
import { item } from '../jsonData/item.json';

export class JsonDataMgr extends Singleton<JsonDataMgr>() {
  private _itemMap: Map<string, IItemData> = new Map();

  constructor() {
    super();
  }
  public init(): void {
    /** 读取物品数据 */
    item.forEach((value) => {
      this._itemMap.set(value.id, value);
    });
  }

  public getDateFromItemMap(id: string): IItemData {
    return this._itemMap.get(id) as IItemData;
  }
  public start(): void {}

  public update(delta: number): void {}

  public destory(): void {}
}
