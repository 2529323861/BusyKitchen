import { CommunicationConst } from '../../../../shares/communicationConst';
import type {
  IServerPayload,
  ITransmitingMessage,
} from '../../../../shares/communicationInterface';
import { EventEmitter } from '../../framework/common/EventEmitter';
import { Singleton } from '../../framework/common/Singleton';

export class CommunicationMgr extends Singleton<CommunicationMgr>() {
  /** 事件绑定token，用于取消事件 */
  private bindeventToken: GameEventHandlerToken | undefined;
  constructor() {
    super();
  }
  public init(): void {
    /** 初始化监听 */
    this.initializeReceiver();
  }
  public start(): void {}
  public update(delta: number): void {}
  public destroy(): void {
    /** 取消事件监听 */
    this.bindeventToken?.cancel();
    CommunicationMgr.destroyInstance();
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
  public sendTo(
    to: GamePlayerEntity | GamePlayerEntity[],
    data: ITransmitingMessage
  ): void {
    remoteChannel.sendClientEvent(to, data);
  }

  /** 发送广播 */
  public sendBroad(data: ITransmitingMessage): void {
    remoteChannel.broadcastClientEvent(data);
  }
}
