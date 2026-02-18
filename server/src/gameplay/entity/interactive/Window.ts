import { CommunicationConst } from '../../../../../shares/communicationConst';
import { CommunicationMgr } from '../../mgr/CommunicationMgr';
import { JsonDataMgr } from '../../mgr/JsonDataMgr';
import { OrderMgr } from '../../mgr/OrderMgr';
import { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import { ScoreMgr } from '../../mgr/ScoreMgr';
import { BaseInteractive } from './BaseInteractive';

export class Window extends BaseInteractive {
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
    const flag = OrderMgr.instance.deliverOrder(
      PlayerSlotMgr.instance.getPlayerSlot(entity.player.userId).id
    );
    if (flag) {
      PlayerSlotMgr.instance.setPlayerSlot(
        entity.player.userId,
        JsonDataMgr.instance.getDateFromItemMap('1000')
      );
      ScoreMgr.instance.addScore(10);
      CommunicationMgr.instance.sendBroad({
        token: CommunicationConst.UI_Screen_GamingLogicScreen_Score_changeScore,
        payload: ScoreMgr.instance.getNowScore(),
      });
      CommunicationMgr.instance.sendTo(entity, {
        token: CommunicationConst.UI_Screen_CommonScreen_MessageList_popMessage,
        payload: '成功提交！',
      });
    } else {
      CommunicationMgr.instance.sendTo(entity, {
        token: CommunicationConst.UI_Screen_CommonScreen_MessageList_popMessage,
        payload: '当前没有需要此物品的订单',
      });
    }
  }
}
