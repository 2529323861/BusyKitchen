import { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import type { IItemData } from '../../jsonData/DataInterface';
import { BaseInteractive } from './BaseInteractive';

export class ItemSource extends BaseInteractive {
  /** 物品源物品类型 */
  private _item: IItemData;

  constructor(entity: GameEntity, item: IItemData) {
    super(entity);
    this._item = item;
  }

  public init(): void {
    this.interactRadius = 3;
    this.bindevent();
  }

  public bindevent(): void {
    /** 当玩家交互时，将物品源物品类型添加到玩家物品栏 */
    this._entity.onInteract(({ entity }) => {
      this.interactCallback(entity);
    });
  }
  /** 交互回调封装 */
  public interactCallback(entity: GamePlayerEntity): void {
    console.log('(server): 物品源被互动');
    PlayerSlotMgr.instance.setPlayerSlot(entity.player.userId, this._item);
  }
}
