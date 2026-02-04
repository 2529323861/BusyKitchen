import { CuttingBoardState } from '../../../../const/stateConst';
import { JsonDataMgr } from '../../../../mgr/JsonDataMgr';
import { PlayerSlotMgr } from '../../../../mgr/PlayerSlotMgr';
import { InteractiveBaseState } from '../../InteractiveBaseState';
import type { CuttingBoard } from '../CuttingBoard';

export class BoardIdleState extends InteractiveBaseState {
  public name: string = CuttingBoardState.BoardIdleState;
  onInteract(player: GamePlayerEntity): void {
    const playerItem = PlayerSlotMgr.instance.getPlayerSlot(
      player.player.userId
    );
    if (JsonDataMgr.instance.searchCuttingTable(playerItem.id)) {
      /** 玩家手中的东西可以切 */
      /** 将玩家手中的东西放入刀板 */
      (this._interactive as CuttingBoard).storageItem = playerItem;
      /** 将空放入玩家手中 */
      PlayerSlotMgr.instance.setPlayerSlot(
        player.player.userId,
        JsonDataMgr.instance.getDateFromItemMap('1000')
      );
      /** 状态切换至未开始状态 */
      console.log('(server): 玩家用可交互物品交互闲置刀板');
      this._interactive._stateMachine!.transitionTo(
        CuttingBoardState.NotStartedState
      );
    } else {
      /** 玩家手中的东西不可以切 */
      console.log('(server): 玩家用不可交互物品交互闲置刀板');
      /** 留空做UI通知 */
    }
  }
}
