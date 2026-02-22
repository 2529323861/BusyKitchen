import type {
  IAssemblyFormulaData,
  IConvertRecipe,
  IItemData,
  IOrdersData,
} from '../../jsonData/DataInterface';

export interface IDataService {
  getDateFromItemMap(id: string): IItemData;
  searchCuttingTable(material: string): IConvertRecipe | undefined;
  searchBoilTable(material: string): IConvertRecipe | undefined;
  searchFryTable(material: string): IConvertRecipe | undefined;
  searchAssemblyFormula(
    material: Array<string>
  ): IAssemblyFormulaData | undefined;
  getRandomOrder(): IOrdersData;
}
