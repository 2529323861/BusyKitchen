import { JsonDataMgr } from '../../mgr/JsonDataMgr';
import { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import { BaseInteractive } from './BaseInteractive';

export class Dustbin extends BaseInteractive {
  constructor(entity: GameEntity) {
    super(entity);
  }
  public init(): void {
    this._entity.interactRadius = 3;
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onInteract(({ entity }) => {
      this.interactCallback(entity);
    });
  }
  /** 交互回调封装 */
  public interactCallback(entity: GamePlayerEntity): void {
    PlayerSlotMgr.instance.setPlayerSlot(
      entity.player.userId,
      JsonDataMgr.instance.getDateFromItemMap('1000')
    );
    console.log(`(server): 已清除玩家 ${entity.player.name} 身上的物品`);
  }
}
