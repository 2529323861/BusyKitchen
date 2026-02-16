import type { ITransmitingMessage } from '../../../../shares/communicationInterface';
import { IServerPayload } from '../../../../shares/communicationInterface';
import { EventEmitter } from '../../framework/EventEmitter';
import { Singleton } from '../../framework/Singleton';

export class CommunicationMgr extends Singleton<CommunicationMgr>() {
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
    CommunicationMgr.destroyInstance();
  }

  private initializeReceiver(): void {
    remoteChannel.onClientEvent((event) => {
      EventEmitter.instance.emit(
        (event as ITransmitingMessage).token,
        (event as ITransmitingMessage).payload
      );
    });
  }

  /** 发送消息 */
  public sendTo(data: ITransmitingMessage): void {
    remoteChannel.sendServerEvent(data);
  }
}
