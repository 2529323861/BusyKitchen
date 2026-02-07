import { StoveState } from '../../../const/stateConst';
import type { IFryTableData } from '../../../jsonData/DataInterface';
import { JsonDataMgr } from '../../../mgr/JsonDataMgr';
import { PlayerSlotMgr } from '../../../mgr/PlayerSlotMgr';
import { Stove } from './Stove';

export class BoilStove extends Stove {
  public bindevent(): void {
    this._entity.onInteract(({ entity }) => {
      const state = this._stateMachine?.getCurrentStateName();
      switch (state) {
        case StoveState.StoveIdleState: {
          /** 交互时炉子处于空闲状态 */
          const playerItem = PlayerSlotMgr.instance.getPlayerSlot(
            entity.player.userId
          );
          if (JsonDataMgr.instance.searchBoilTable(playerItem.id)) {
            /** 玩家手中的东西可以煮 */
            /** 将玩家手中的东西放入炉子中 */
            this.storageItem = playerItem;
            /** 将空放入玩家手中 */
            PlayerSlotMgr.instance.setPlayerSlot(
              entity.player.userId,
              JsonDataMgr.instance.getDateFromItemMap('1000')
            );
            /** 状态切换蒸煮中 */
            console.log('(server): 玩家用可交互物品交互闲置锅炉');
            this._stateMachine!.transitionTo(StoveState.CookingState);
          } else {
            /** 玩家手中的东西不可以蒸煮 */
            console.log('(server): 玩家用不可交互物品交互闲置锅炉');
            /** 留空做UI通知 */
          }
          break;
        }
        case StoveState.CookingFinishState: {
          /** 交互时炉子处于完成状态 */
          const playerItem = PlayerSlotMgr.instance.getPlayerSlot(
            entity.player.userId
          );
          if (playerItem.id === '1001') {
            /** 玩家手中物品为盘子 */

            const product = JsonDataMgr.instance.getDateFromItemMap(
              (
                JsonDataMgr.instance.searchBoilTable(
                  this.storageItem.id
                ) as IFryTableData
              ).product
            );

            /** 将煮锅中物品根据配方的合成产物取出 */
            PlayerSlotMgr.instance.setPlayerSlot(entity.player.userId, product);
            this.storageItem = JsonDataMgr.instance.getDateFromItemMap('1000');

            console.log('(server): 玩家将结束锅炉中的产物取出');
            /** 切换状态为闲置状态 */
            this._stateMachine!.transitionTo(StoveState.StoveIdleState);
          } else {
            /** 玩家手中不为空，不可取出物品 */
            console.log('(server): 玩家无法取出结束锅炉');
            /** 预留UI接口 */
          }
          break;
        }
        case StoveState.BurntPotState: {
          /** 交互时炉子处于烧焦状态 */
          const playerItem = PlayerSlotMgr.instance.getPlayerSlot(
            entity.player.userId
          );
          if (playerItem.id === '1001') {
            /** 玩家手中物品为盘子 */

            /** 给予玩家锅灰 */
            PlayerSlotMgr.instance.setPlayerSlot(
              entity.player.userId,
              JsonDataMgr.instance.getDateFromItemMap('1014')
            );
            this.storageItem = JsonDataMgr.instance.getDateFromItemMap('1000');
            console.log('(server): 玩家将锅灰从烧糊锅炉中取出');
            this._stateMachine!.transitionTo(StoveState.CleaningState);
          } else {
            /** 玩家手中不为空，不可取出物品 */
            console.log('(server): 玩家无法取出烧糊锅炉');
            /** 预留UI接口 */
          }
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
