import { CommunicationConst } from '../../../../shares/communicationConst';
import type { ITransmitingMessage } from '../../../../shares/communicationInterface';
import { IServerPayload } from '../../../../shares/communicationInterface';
import { EventEmitter } from '../../framework/EventEmitter';
import { Singleton } from '../../framework/Singleton';

export class CommunicationMgr extends Singleton<CommunicationMgr>() {
  /** 是否成功在服务端注册 */
  public isRegisted: boolean = false;

  private timer: number = 1000;

  constructor() {
    super();
  }
  public init(): void {
    /** 初始化监听 */
    this.initializeReceiver();
  }
  public start(): void {
    this.sendinit();
  }
  private sendinit() {
    this.sendTo({
      token: CommunicationConst.Init_Request,
      payload: undefined,
    });
  }
  public update(delta: number): void {
    if (!this.isRegisted) {
      this.timer -= delta;
      if (this.timer <= 0) {
        this.sendinit();
        this.timer = 1000;
      }
    }
  }
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
