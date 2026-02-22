import { Container } from '../../../../di/Container';
import { SERVICE_TOKENS } from '../../../../di/tokens';
import type { IConvertRecipe } from '../../../../jsonData/DataInterface';
import type { IDataService } from '../../../../service/interface/IDataService';
import type { IStoveStrategyg } from './IStoveStrategy';

export class FryStrategy implements IStoveStrategyg {
  stoveTypeName: string = '煎锅';

  cookingVerb: string = '煎';

  /** 数据依赖 */
  private dataService: IDataService;

  constructor() {
    /** 注入数据依赖 */
    this.dataService = Container.instance.resolve<IDataService>(
      SERVICE_TOKENS.DATA_SERVICE
    );
  }

  searchRecipe(material: string): IConvertRecipe | undefined {
    return this.dataService.searchFryTable(material);
  }
}
