import { Container } from '../../di/Container';
import { SERVICE_TOKENS } from '../../di/tokens';
import { JsonDataMgr } from '../../mgr/JsonDataMgr';
import { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import type { IDataService } from '../../service/interface/IDataService';
import type { IPlayerService } from '../../service/interface/IPlayerService';
import { BaseInteractive } from './BaseInteractive';

export class Dustbin extends BaseInteractive {
  /** 玩家依赖 */
  private playerService: IPlayerService;

  /** 数据依赖 */
  private dataService: IDataService;

  constructor(entity: GameEntity) {
    super(entity);
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
    this.playerService.setPlayerSlot(
      entity.player.userId,
      this.dataService.getDateFromItemMap('1000')
    );
    console.log(`(server): 已清除玩家 ${entity.player.name} 身上的物品`);
  }
}
