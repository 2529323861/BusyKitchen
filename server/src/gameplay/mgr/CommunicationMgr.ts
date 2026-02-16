import { CommunicationConst } from '../../../../shares/communicationConst';
import type {
  IServerPayload,
  ITransmitingMessage,
} from '../../../../shares/communicationInterface';
import { EventEmitter } from '../../framework/common/EventEmitter';
import { Singleton } from '../../framework/common/Singleton';

export class CommunicationMgr extends Singleton<CommunicationMgr>() {
  constructor() {
    super();
  }
  public init(): void {
    /** 初始化监听 */
    this.initializeReceiver();
  }
  public start(): void {
    /** 测试代码 */
    setTimeout(() => {
      this.sendBroad({
        token: CommunicationConst.UI_Screen_CommonScreen_MessageList_popMessage,
        payload: '广播提示: 双端通讯成功打通！',
      });
    }, 1000);
    setTimeout(() => {
      this.sendBroad({
        token: CommunicationConst.UI_Screen_CommonScreen_MessageList_popMessage,
        payload: '这是同时发送的广播-1',
      });
      this.sendBroad({
        token: CommunicationConst.UI_Screen_CommonScreen_MessageList_popMessage,
        payload: '这是同时发送的广播-2',
      });
    }, 2000);
  }
  public update(delta: number): void {}
  public destroy(): void {}

  private initializeReceiver(): void {
    remoteChannel.onServerEvent((event) => {
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
