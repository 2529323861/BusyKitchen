import { CuttingBoardState } from '../../../../const/stateConst';
import { JsonDataMgr } from '../../../../mgr/JsonDataMgr';
import { PlayerSlotMgr } from '../../../../mgr/PlayerSlotMgr';
import { InteractiveBaseState } from '../../InteractiveBaseState';
import type { CuttingBoard } from '../CuttingBoard';

export class NotStartedState extends InteractiveBaseState {
  public name: string = CuttingBoardState.NotStartedState;
  onInteract(player: GamePlayerEntity): void {
    const playerItem = PlayerSlotMgr.instance.getPlayerSlot(
      player.player.userId
    );
    if (playerItem.id === '1000') {
      /** 玩家手中物品为空 */

      /** 将容器中物品取出 */
      PlayerSlotMgr.instance.setPlayerSlot(
        player.player.userId,
        (this._interactive as CuttingBoard).storageItem
      );
      (this._interactive as CuttingBoard).storageItem =
        JsonDataMgr.instance.getDateFromItemMap('1000');

      console.log('(server): 玩家将未开始刀板中物品取出');
      /** 切换状态为闲置状态 */
      this._interactive._stateMachine!.transitionTo(
        CuttingBoardState.BoardIdleState
      );
    } else {
      /** 玩家手中不为空，不可取出物品 */
      console.log('(server): 玩家无法取出未开始刀板');
      /** 预留UI接口 */
    }
  }
}
