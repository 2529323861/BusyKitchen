import {
  StateMachine,
  type IStateConfig,
} from '../../../../framework/common/StateMachine';
import { StoveState } from '../../../const/stateConst';
import type { IItemData } from '../../../jsonData/DataInterface';
import { JsonDataMgr } from '../../../mgr/JsonDataMgr';
import { BaseInteractive } from '../BaseInteractive';
import { BurntPotState } from './state/BurntPotState';
import { CleaningState } from './state/CleaningState';
import { CookingFinishState } from './state/CookingFinishState';
import { CookingState } from './state/CookingState';
import { StoveIdleState } from './state/StoveIdleState';

export class Stove extends BaseInteractive {
  public readonly _stoveProgressAnimationToken: string;

  protected storageItem: IItemData =
    JsonDataMgr.instance.getDateFromItemMap('1000');

  constructor(entity: GameEntity, stoveProgressAnimationToken: string) {
    super(entity);
    this._stoveProgressAnimationToken = stoveProgressAnimationToken;
  }

  public init(): void {
    this.storageItem = JsonDataMgr.instance.getDateFromItemMap('1000');
    this.interactRadius = 3;
    const stateConfig: IStateConfig = {
      initialState: StoveState.StoveIdleState,
      transitions: {
        /** 闲置状态 -> 烹饪状态 */
        [StoveState.StoveIdleState]: {
          [StoveState.CookingState]: [],
        },
        /** 烹饪状态 -> 完成状态 */
        [StoveState.CookingState]: {
          [StoveState.CookingFinishState]: [],
        },
        /** 完成状态 -> 烧焦状态 或 闲置状态 */
        [StoveState.CookingFinishState]: {
          [StoveState.BurntPotState]: [],
          [StoveState.StoveIdleState]: [],
        },
        /** 烧焦状态 -> 清洁状态 */
        [StoveState.BurntPotState]: {
          [StoveState.CleaningState]: [],
        },
        /** 清洁状态 -> 闲置状态 */
        [StoveState.CleaningState]: {
          [StoveState.StoveIdleState]: [],
        },
      },
    };
    this._stateMachine = new StateMachine(stateConfig);
    this._stateMachine.addState(new StoveIdleState(this));
    this._stateMachine.addState(new CookingState(this));
    this._stateMachine.addState(new CookingFinishState(this));
    this._stateMachine.addState(new BurntPotState(this));
    this._stateMachine.addState(new CleaningState(this));

    this._stateMachine.init();
    this.bindevent();
  }
  public update(delta: number): void {
    this._stateMachine?.update(delta);
    this._stateMachine?.getCurrentStateName();
  }
}
