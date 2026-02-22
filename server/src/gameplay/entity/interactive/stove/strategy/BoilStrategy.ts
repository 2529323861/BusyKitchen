import { Container } from '../../../../di/Container';
import { SERVICE_TOKENS } from '../../../../di/tokens';
import type { IConvertRecipe } from '../../../../jsonData/DataInterface';
import type { IDataService } from '../../../../service/interface/IDataService';
import type { IStoveStrategyg } from './IStoveStrategy';

export class BoilStrategy implements IStoveStrategyg {
  stoveTypeName: string = '锅炉';

  cookingVerb: string = '煮';

  /** 数据依赖 */
  private dataService: IDataService;

  constructor() {
    /** 注入数据依赖 */
    this.dataService = Container.instance.resolve<IDataService>(
      SERVICE_TOKENS.DATA_SERVICE
    );
  }

  searchRecipe(material: string): IConvertRecipe | undefined {
    return this.dataService.searchBoilTable(material);
  }
}
