import { Singleton } from '../../framework/common/Singleton';
import type {
  IItemData,
  ICuttingTableData,
  IBoilTableData,
  IFryTableData,
  IAssemblyFormulaData,
} from '../jsonData/DataInterface';
import { item } from '../jsonData/item.json';
import { cuttingTable } from '../jsonData/cuttingTable.json';
import { boilTable } from '../jsonData/BoilTable.json';
import { fryTable } from '../jsonData/fryTable.json';
import { AssemblyFormula } from '../jsonData/AssemblyFormula.json';

export class JsonDataMgr extends Singleton<JsonDataMgr>() {
  private _itemMap: Map<string, IItemData> = new Map();
  private _cuttingTableArray: Array<ICuttingTableData> = [];
  private _boilTableArray: Array<IBoilTableData> = [];
  private _fryTableArray: Array<IFryTableData> = [];
  private _assemblyFormula: Array<IAssemblyFormulaData> = [];

  constructor() {
    super();
  }
  public init(): void {
    /** 读取物品数据 */
    item.forEach((value) => {
      this._itemMap.set(value.id, value as IItemData);
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

    /** 读取合成配方数据 */
    AssemblyFormula.forEach((value) => {
      this._assemblyFormula.push(value);
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

  /** 匹配合成配方 */
  public searchAssemblyFormula(
    material: Array<string>
  ): IAssemblyFormulaData | undefined {
    for (const i of this._assemblyFormula) {
      let flag = true;
      for (const j of material) {
        /** 判断目标配方是否完全包含当前所有原料 */
        if (!i.material.includes(j)) {
          flag = false;
          break;
        }
      }
      /** 判断目标配方是否完全包含当前所有原料，且长度一致（即判断输入自身是否过剩） */
      if (flag && i.material.length === material.length) {
        return i;
      }
    }
    /** 没能找到匹配的配方 */
    return undefined;
  }
  public start(): void {}

  public update(delta: number): void {}

  public destroy(): void {
    JsonDataMgr.destroyInstance();
  }
}
