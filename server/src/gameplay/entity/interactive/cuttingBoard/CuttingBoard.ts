import type { IStateConfig } from '../../../../framework/common/StateMachine';
import { StateMachine } from '../../../../framework/common/StateMachine';
import { BaseInteractive } from '../BaseInteractive';
import { CuttingBoardState } from '../../../const/stateConst';
import { BoardIdleState } from './state/BoardIdleState';
import type { IItemData } from '../../../jsonData/DataInterface';
import { JsonDataMgr } from '../../../mgr/JsonDataMgr';
import { NotStartedState } from './state/NotStartedState';
import { CuttingState } from './state/CuttingState';
import { CuttingFinishState } from './state/CuttingFinishState';
import { PlayerSlotMgr } from '../../../mgr/PlayerSlotMgr';

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
    this._stateMachine = new StateMachine(stateConfig);
    this._stateMachine.addState(new BoardIdleState(this));
    this._stateMachine.addState(new NotStartedState(this));
    this._stateMachine.addState(new CuttingState(this));
    this._stateMachine.addState(new CuttingFinishState(this));

    this._stateMachine.init();
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onInteract(({ entity }) => {
      switch (this._stateMachine?.getCurrentStateName()) {
        case CuttingBoardState.BoardIdleState:
          {
            const playerItem = PlayerSlotMgr.instance.getPlayerSlot(
              entity.player.userId
            );
            if (JsonDataMgr.instance.searchCuttingTable(playerItem.id)) {
              /** 玩家手中的东西可以切 */
              /** 将玩家手中的东西放入刀板 */
              this.storageItem = playerItem;
              /** 将空放入玩家手中 */
              PlayerSlotMgr.instance.setPlayerSlot(
                entity.player.userId,
                JsonDataMgr.instance.getDateFromItemMap('1000')
              );
              /** 状态切换至未开始状态 */
              console.log('(server): 玩家用可交互物品交互闲置刀板');
              this._stateMachine!.transitionTo(
                CuttingBoardState.NotStartedState
              );
            } else {
              /** 玩家手中的东西不可以切 */
              console.log('(server): 玩家用不可交互物品交互闲置刀板');
              /** 留空做UI通知 */
            }
          }
          break;
        case CuttingBoardState.NotStartedState:
          {
            const playerItem = PlayerSlotMgr.instance.getPlayerSlot(
              entity.player.userId
            );
            if (playerItem.id === '1000') {
              /** 玩家手中物品为空 */

              /** 将容器中物品取出 */
              PlayerSlotMgr.instance.setPlayerSlot(
                entity.player.userId,
                this.storageItem
              );
              this.storageItem =
                JsonDataMgr.instance.getDateFromItemMap('1000');

              console.log('(server): 玩家将未开始刀板中物品取出');
              /** 切换状态为闲置状态 */
              this._stateMachine!.transitionTo(
                CuttingBoardState.BoardIdleState
              );
            } else {
              /** 玩家手中不为空，不可取出物品 */
              console.log('(server): 玩家无法取出未开始刀板');
              /** 预留UI接口 */
            }
          }
          break;
        case CuttingBoardState.CuttingState:
          break;
        case CuttingBoardState.CuttingFinishState:
          break;
      }
    });
  }
}
