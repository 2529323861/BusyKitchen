import type { ITransmitingMessage } from '../../../../../shares/communicationInterface';

export interface ICommunicationService {
  /** 向指定id的玩家发送数据 */
  sendTo(userId: string, data: ITransmitingMessage): void;
  /** 广播消息 */
  sendBroad(data: ITransmitingMessage): void;
  /** 向指定id的玩家弹出提示（是发送数据的柯里化函数，简化调用） */
  popMessageToPlayer(userId: string, message: string): void;
}
