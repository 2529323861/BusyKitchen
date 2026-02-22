import type {
  IAssemblyFormulaData,
  IBoilTableData,
  ICuttingTableData,
  IItemData,
  IOrdersData,
} from '../../jsonData/DataInterface';

export interface IDataService {
  getDateFromItemMap(id: string): IItemData;
  searchCuttingTable(material: string): ICuttingTableData | undefined;
  searchBoilTable(material: string): IBoilTableData | undefined;
  searchFryTable(material: string): ICuttingTableData | undefined;
  searchAssemblyFormula(
    material: Array<string>
  ): IAssemblyFormulaData | undefined;
  getRandomOrder(): IOrdersData;
}
