import type { IConvertRecipe } from '../../../../jsonData/DataInterface';

export interface IStoveStrategyg {
  /** 查找配方表 */
  searchRecipe(material: string): IConvertRecipe | undefined;
  /** 灶台类型名称 */
  stoveTypeName: string;
  /** 烹饪动词 */
  cookingVerb: string;
}
