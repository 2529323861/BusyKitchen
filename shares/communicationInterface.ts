/* eslint-disable @typescript-eslint/no-explicit-any */

/** 传输消息体，用于通讯api的直接调用传参 */
export interface ITransmitingMessage {
  /** 消息类型 */
  token: string;
  /** 消息内容,用于构造事件载荷 */
  payload: any;
}

/** 服务端接收到消息后用于发送事件所构造的事件载荷 */
export interface IServerPayload {
  /** 用户id，向服务器发送该消息的用户id */
  userId: string;
  /** 消息内容,用于构造事件载荷 */
  payload: any;
}

export interface IInit_response {
  /** 当前同步的屏幕 */
  screen: string;
  /** 当前屏幕的数据 */
  data: [string, any][];
}
