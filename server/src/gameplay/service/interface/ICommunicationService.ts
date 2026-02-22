import type { ITransmitingMessage } from '../../../../../shares/communicationInterface';

export interface ICommunicationService {
  /** 向特定id的玩家发送消息 */
  sendTo(userId: string, data: ITransmitingMessage): void;
  /** 广播消息 */
  sendBroad(data: ITransmitingMessage): void;
}
