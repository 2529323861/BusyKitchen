import { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import type { IItemData } from '../../jsonData/DataInterface';
import { BaseInteractive } from './BaseInteractive';
import type { IPlayerService } from '../../service/interface/IPlayerService';
import type { IDataService } from '../../service/interface/IDataService';
import { Container } from '../../di/Container';
import { SERVICE_TOKENS } from '../../di/tokens';

export class ItemSource extends BaseInteractive {
  /** 物品源物品类型 */
  private item: string;

  /** 玩家依赖 */
  private playerService: IPlayerService;

  /** 数据依赖 */
  private dataService: IDataService;

  constructor(entity: GameEntity, item: string) {
    super(entity);
    this.item = item;

    /** 注入玩家依赖 */
    this.playerService = Container.instance.resolve<IPlayerService>(
      SERVICE_TOKENS.PLAYER_SERVICE
    );
    /** 注入数据依赖 */
    this.dataService = Container.instance.resolve<IDataService>(
      SERVICE_TOKENS.DATA_SERVICE
    );
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
    this.playerService.setPlayerSlot(
      entity.player.userId,
      this.dataService.getDateFromItemMap(this.item)
    );
  }
}
