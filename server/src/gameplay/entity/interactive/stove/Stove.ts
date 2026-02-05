import type { IStateConfig } from '../../../../framework/common/StateMachine';
import { StoveState } from '../../../const/stateConst';
import { BaseInteractive } from '../BaseInteractive';

export class Stove extends BaseInteractive {
  constructor(entity: GameEntity) {
    super(entity);
  }
  public init(): void {
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
  }
}
