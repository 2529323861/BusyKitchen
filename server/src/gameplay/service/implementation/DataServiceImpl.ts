import type {
  IItemData,
  IAssemblyFormulaData,
  IOrdersData,
  IConvertRecipe,
} from '../../jsonData/DataInterface';
import type { JsonDataMgr } from '../../mgr/JsonDataMgr';
import type { IDataService } from '../interface/IDataService';

export class DataServiceImpl implements IDataService {
  constructor(private jsonDataMgr: JsonDataMgr) {}

  getDateFromItemMap(id: string): IItemData {
    return this.jsonDataMgr.getDateFromItemMap(id);
  }
  searchCuttingTable(material: string): IConvertRecipe | undefined {
    return this.jsonDataMgr.searchCuttingTable(material);
  }
  searchBoilTable(material: string): IConvertRecipe | undefined {
    return this.jsonDataMgr.searchBoilTable(material);
  }
  searchFryTable(material: string): IConvertRecipe | undefined {
    return this.jsonDataMgr.searchFryTable(material);
  }
  searchAssemblyFormula(
    material: Array<string>
  ): IAssemblyFormulaData | undefined {
    return this.jsonDataMgr.searchAssemblyFormula(material);
  }
  getRandomOrder(): IOrdersData {
    return this.jsonDataMgr.getRandomOrder();
  }
}
