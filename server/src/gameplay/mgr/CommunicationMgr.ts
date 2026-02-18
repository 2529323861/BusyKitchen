import { CommunicationConst } from '../../../../shares/communicationConst';
import type {
  IInit_response,
  IServerPayload,
  ITransmitingMessage,
} from '../../../../shares/communicationInterface';
import { EventEmitter } from '../../framework/common/EventEmitter';
import { Singleton } from '../../framework/common/Singleton';
import { LogicConst } from '../const/logicConst';
import { LogicScreenToken } from '../const/LogicScreenConst';
import { GameplayState } from '../const/stateConst';
import { Timer } from '../const/Timer';
import type { MainLogic } from '../gameLogic/MainLogic';
import { GameLogicMgr } from './GameLogicMgr';
import { OrderMgr } from './OrderMgr';
import { PlayerEntityMgr } from './PlayerEntityMgr';
import { ScoreMgr } from './ScoreMgr';
import { TimeMgr } from './TimeMgr';

export class CommunicationMgr extends Singleton<CommunicationMgr>() {
  /** 事件绑定token，用于取消事件 */
  private bindeventToken: GameEventHandlerToken | undefined;

  /** 初始化用户的id, 只有客户端容器初始化完毕后才可以接收服务端的各种信息 */
  private livingPlayerList: string[] = [];

  constructor() {
    super();
  }
  public init(): void {
    /** 初始化监听 */
    this.initializeReceiver();
    this.bindevent();
  }
  public start(): void {}
  public update(delta: number): void {}
  public destroy(): void {
    /** 取消事件监听 */
    this.bindeventToken?.cancel();
    CommunicationMgr.destroyInstance();
  }

  private bindevent() {
    EventEmitter.instance.on(CommunicationConst.Init_Request, (payload) => {
      /** 若玩家未完全初始化，则忽略 */
      if (
        !PlayerEntityMgr.instance.hasPlayer((payload as IServerPayload).userId)
      ) {
        return;
      }
      /** 将发送初始化请求的id加入可以通讯的列表中 */
      this.livingPlayerList.push((payload as IServerPayload).userId);

      /** 对请求的玩家做出初始化响应 */

      /** 构造响应体 */
      const responsePayload: IInit_response = {
        screen: '',
        data: [],
      };
      switch (
        (
          GameLogicMgr.instance.getGameLogic(LogicConst.MainLogic) as MainLogic
        ).stateMachine?.getCurrentStateName()
      ) {
        case GameplayState.PlayingState: {
          responsePayload.screen = LogicScreenToken.GamingLogicScreen;
          responsePayload.data.push([
            'orderList',
            OrderMgr.instance.getClientSyncOrderList(),
          ]);
          responsePayload.data.push([
            'countDown',
            TimeMgr.instance.getTime(Timer.GamingCountDown),
          ]);
          responsePayload.data.push(['score', ScoreMgr.instance.getNowScore()]);
          break;
        }
        case GameplayState.WaitingState: {
          responsePayload.screen = LogicScreenToken.WaitingScreen;
          console.log(
            `(server): ${TimeMgr.instance.getTime(Timer.WaitingCountDown)}`
          );
          responsePayload.data.push([
            'countDown',
            TimeMgr.instance.getTime(Timer.WaitingCountDown),
          ]);
          break;
        }
        case GameplayState.GameOverState: {
          responsePayload.screen = LogicScreenToken.SettlementScreen;
          responsePayload.data.push(['score', ScoreMgr.instance.getNowScore()]);
          responsePayload.data.push([
            'countDown',
            TimeMgr.instance.getTime(Timer.SettlementCountDown),
          ]);
          break;
        }
      }

      /** 发送响应 */
      CommunicationMgr.instance.sendTo(
        PlayerEntityMgr.instance.getPlayerEntity(
          (payload as IServerPayload).userId
        ) as GamePlayerEntity,
        {
          token: CommunicationConst.Init_Response,
          payload: responsePayload,
        }
      );
    });
  }

  private initializeReceiver(): void {
    this.bindeventToken = remoteChannel.onServerEvent((event) => {
      const serverPayload: IServerPayload = {
        userId: event.entity.player.userId,
        payload: (event.args as ITransmitingMessage).payload,
      };
      EventEmitter.instance.emit(
        (event.args as ITransmitingMessage).token,
        serverPayload
      );
    });
  }

  /** 发送消息 */
  public sendTo(to: GamePlayerEntity, data: ITransmitingMessage): void {
    if (this.livingPlayerList.includes(to.player.userId)) {
      remoteChannel.sendClientEvent(to, data);
    }
  }

  /** 发送广播 */
  public sendBroad(data: ITransmitingMessage): void {
    for (const i of this.livingPlayerList) {
      if (PlayerEntityMgr.instance.getPlayerEntity(i)) {
        remoteChannel.sendClientEvent(
          PlayerEntityMgr.instance.getPlayerEntity(i) as GamePlayerEntity,
          data
        );
      }
    }
  }
}
