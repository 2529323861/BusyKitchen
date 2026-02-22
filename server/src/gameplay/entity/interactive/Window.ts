import { CommunicationConst } from '../../../../../shares/communicationConst';
import { Container } from '../../di/Container';
import { SERVICE_TOKENS } from '../../di/tokens';
import { IOrdersData } from '../../jsonData/DataInterface';
import { CommunicationMgr } from '../../mgr/CommunicationMgr';
import { JsonDataMgr } from '../../mgr/JsonDataMgr';
import { OrderMgr } from '../../mgr/OrderMgr';
import { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import { ScoreMgr } from '../../mgr/ScoreMgr';
import type { ICommunicationService } from '../../service/interface/ICommunicationService';
import type { IDataService } from '../../service/interface/IDataService';
import type { IOrderService } from '../../service/interface/IOrderService';
import type { IPlayerService } from '../../service/interface/IPlayerService';
import type { IScoreService } from '../../service/interface/IScoreService';
import { BaseInteractive } from './BaseInteractive';

export class Window extends BaseInteractive {
  /** 玩家依赖 */
  private playerService: IPlayerService;

  /** 通讯依赖 */
  private communicationService: ICommunicationService;

  /** 数据依赖 */
  private dataService: IDataService;

  /** 得分依赖 */
  private scoreService: IScoreService;

  /** 订单依赖 */
  private orderService: IOrderService;

  constructor(entity: GameEntity) {
    super(entity);
    /** 注入玩家依赖 */
    this.playerService = Container.instance.resolve<IPlayerService>(
      SERVICE_TOKENS.PLAYER_SERVICE
    );
    /** 注入通讯依赖 */
    this.communicationService =
      Container.instance.resolve<ICommunicationService>(
        SERVICE_TOKENS.COMMUNICATION_SERVICE
      );
    /** 注入数据依赖 */
    this.dataService = Container.instance.resolve<IDataService>(
      SERVICE_TOKENS.DATA_SERVICE
    );
    /** 注入得分依赖 */
    this.scoreService = Container.instance.resolve<IScoreService>(
      SERVICE_TOKENS.SCORE_SERVICE
    );
    /** 注入订单依赖 */
    this.orderService = Container.instance.resolve<IOrderService>(
      SERVICE_TOKENS.ORDER_SERVICE
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
    const flag = this.orderService.deliverOrder(
      this.playerService.getPlayerSlot(entity.player.userId).id
    );
    if (flag) {
      this.playerService.setPlayerSlot(
        entity.player.userId,
        this.dataService.getDateFromItemMap('1000')
      );
      this.scoreService.addScore(10);
      /** 更新得分UI */
      this.communicationService.updateScore();
      this.communicationService.popMessageToPlayer(
        entity.player.userId,
        '成功提交'
      );
    } else {
      this.communicationService.popMessageToPlayer(
        entity.player.userId,
        '当前没有需要此物品的订单'
      );
    }
  }
}
