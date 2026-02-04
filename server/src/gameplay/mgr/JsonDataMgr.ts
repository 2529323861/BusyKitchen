import { Singleton } from '../../framework/common/Singleton';
import type { IItemData, ICuttingTableData } from '../jsonData/DataInterface';
import { item } from '../jsonData/item.json';
import { cuttingTable } from '../jsonData/cuttingTable.json';

export class JsonDataMgr extends Singleton<JsonDataMgr>() {
  private _itemMap: Map<string, IItemData> = new Map();
  private _cuttingTableArray: Array<ICuttingTableData> = [];

  constructor() {
    super();
  }
  public init(): void {
    /** 读取物品数据 */
    item.forEach((value) => {
      this._itemMap.set(value.id, value);
    });

    /** 读取切菜表数据 */
    cuttingTable.forEach((value) => {
      this._cuttingTableArray.push(value);
    });
  }

  public getDateFromItemMap(id: string): IItemData {
    return this._itemMap.get(id) as IItemData;
  }

  /** 检索切菜表配方 */
  public searchCuttingTable(material: string): ICuttingTableData | undefined {
    return this._cuttingTableArray.find((value) => value.material === material);
  }

  public start(): void {}

  public update(delta: number): void {}

  public destory(): void {}
}
