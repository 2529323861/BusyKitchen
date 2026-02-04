import type { IStateConfig } from '../../../../framework/common/StateMachine';
import { BaseInteractive } from '../BaseInteractive';
import { CuttingBoardState } from '../../../const/stateConst';
import { BoardIdleState } from './state/BoardIdleState';
import { InteractiveStateMachine } from '../InteractiveStateMachine';
import type { IItemData } from '../../../jsonData/DataInterface';
import { JsonDataMgr } from '../../../mgr/JsonDataMgr';
import { NotStartedState } from './state/NotStartedState';
import { CuttingState } from './state/CuttingState';
import { CuttingFinishState } from './state/CuttingFinishState';

export class CuttingBoard extends BaseInteractive {
  /** 刀板暂存物默认为空 */
  public storageItem: IItemData = {
    id: '1000',
    name: '空',
    discription: '手上啥也没有',
  };

  constructor(entity: GameEntity) {
    super(entity);
  }
  public init(): void {
    this.storageItem = JsonDataMgr.instance.getDateFromItemMap('1000');
    this.interactRadius = 3;
    const stateConfig: IStateConfig = {
      initialState: CuttingBoardState.BoardIdleState,
      transitions: {
        /** 空闲状态 -> 未开始状态 */
        [CuttingBoardState.BoardIdleState]: {
          [CuttingBoardState.NotStartedState]: [],
        },
        /** 空闲状态 <- 未开始状态 -> 切菜状态 */
        [CuttingBoardState.NotStartedState]: {
          [CuttingBoardState.CuttingState]: [],
          [CuttingBoardState.BoardIdleState]: [],
        },
        /** 切菜状态 -> 完成状态 */
        [CuttingBoardState.CuttingState]: {
          [CuttingBoardState.CuttingFinishState]: [],
        },
        /** 完成状态 ->  */
        [CuttingBoardState.CuttingFinishState]: {
          [CuttingBoardState.BoardIdleState]: [],
        },
      },
    };
    this._stateMachine = new InteractiveStateMachine(stateConfig);
    this._stateMachine.addState(new BoardIdleState(this));
    this._stateMachine.addState(new NotStartedState(this));
    this._stateMachine.addState(new CuttingState(this));
    this._stateMachine.addState(new CuttingFinishState(this));

    this._stateMachine.init();
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onInteract(({ entity }) => {
      this._stateMachine?.interact(entity);
    });
  }
}
