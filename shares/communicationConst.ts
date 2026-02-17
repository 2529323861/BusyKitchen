import type { LogicScreenToken } from './LogicScreenConst';

export const enum CommunicationConst {
  /** Common */
  /**
   * 消息列表增加条目
   * @type {string} payload 要提示的消息内容
   * */
  UI_Screen_CommonScreen_MessageList_popMessage = 'UI_Screen_CommonScreen_MessageList_popMessage',

  /** Gaming */
  /** 订单列表增加条目
   * @type {{
   * name: string,
   * image: string,
   * maxTime: number,
   * nowTime: number
   * }} payload 订单信息
   */
  UI_Screen_GamingLogicScreen_OrderList_addEntry = 'UI_Screen_GamingLogicScreen_OrderList_addEntry',

  /** 订单列表删除条目
   * @type {number} payload 订单在服务端订单列表中的编号
   */
  UI_Screen_GamingLogicScreen_OrderList_removeEntry = 'UI_Screen_GamingLogicScreen_OrderList_removeEntry',

  /**设置当前倒计时
   * @type {number} payload 要设置的时间
   */
  UI_Screen_GamingLogicScreen_CountDown_setTime = 'UI_Screen_GamingLogicScreen_CountDown_setTime',

  /**设置当前得分
   * @type {number} payload 要设置的得分
   */
  UI_Screen_GamingLogicScreen_Score_changeScore = 'I_Screen_GamingLogicScreen_Score_changeScore',

  /** Waiting */
  /**设置当前倒计时
   * @type {number} payload 要设置的时间
   */
  UI_Screen_WaitingScreen_CountDown_setTime = 'UI_Screen_WaitingScreen_CountDown_setTime',

  /** Settlement */
  /**设置当前倒计时
   * @type {number} payload 要设置的时间
   */
  UI_Screen_SettlementScreen_CountDown_setTime = 'UI_Screen_SettlementScreen_CountDown_setTime',

  /**设置当前得分
   * @type {number} payload 要设置的得分
   */
  UI_Screen_SettlementScreen_Score_changeScore = 'UI_Screen_SettlementScreen_Score_changeScore',

  /** 初始化请求，由客户端发起，表示客户端容器已初始化完毕，可以开始接收数据 */
  Init_Request = 'Init_Request',

  /** 初始化响应，由服务端回复客户端请求，包含当前的UI阶段和各个阶段的数据，用于双端数据同步 */
  Init_Response = 'Init_Response',
  /**
   * 切换屏幕
   * @type {LogicScreenToken} payload 要切换到的屏幕
   * */
  UI_ChangeScreen = 'UI_ChangeScreen',
}
