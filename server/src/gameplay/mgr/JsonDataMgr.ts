import { Singleton } from '../../framework/common/Singleton';
import type {
  IItemData,
  ICuttingTableData,
  IBoilTableData,
  IFryTableData,
} from '../jsonData/DataInterface';
import { item } from '../jsonData/item.json';
import { cuttingTable } from '../jsonData/cuttingTable.json';
import { boilTable } from '../jsonData/BoilTable.json';
import { fryTable } from '../jsonData/fryTable.json';

export class JsonDataMgr extends Singleton<JsonDataMgr>() {
  private _itemMap: Map<string, IItemData> = new Map();
  private _cuttingTableArray: Array<ICuttingTableData> = [];
  private _boilTableArray: Array<IBoilTableData> = [];
  private _fryTableArray: Array<IFryTableData> = [];

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

    /** 读取煮菜表数据 */
    boilTable.forEach((value) => {
      this._boilTableArray.push(value);
    });

    /** 读取煎炸表数据 */
    fryTable.forEach((value) => {
      this._fryTableArray.push(value);
    });
  }

  /** 从物品数据中获取数据 */
  public getDateFromItemMap(id: string): IItemData {
    return this._itemMap.get(id) as IItemData;
  }

  /** 检索切菜表配方 */
  public searchCuttingTable(material: string): ICuttingTableData | undefined {
    return this._cuttingTableArray.find((value) => value.material === material);
  }

  /** 检索水煮表配方 */
  public searchBoilTable(material: string): IBoilTableData | undefined {
    return this._boilTableArray.find((value) => value.material === material);
  }

  /** 检索切菜表配方 */
  public searchFryTable(material: string): ICuttingTableData | undefined {
    return this._fryTableArray.find((value) => value.material === material);
  }

  public start(): void {}

  public update(delta: number): void {}

  public destory(): void {}
}
