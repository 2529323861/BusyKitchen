import { UiIndex_common } from '../../../../UiIndex/screens/UiIndex_common';
import { CommonLogicScreenComponentToken } from '../../const/UIComponentConst';
import { MessageList } from '../UIComponent/MessageList/MessageList';
import { BaseLogicScreen } from './BaseLogicScreen';

export class CommonLogicScreen extends BaseLogicScreen {
  private _UIIndex: UiIndex_common;
  constructor(uiScreen: UiScreen) {
    super(uiScreen);
    this._UIIndex = new UiIndex_common(uiScreen);
  }
  public init(): void {
    /** 注册提示消息列表 */
    this.addComponent(
      CommonLogicScreenComponentToken.MessageList,
      new MessageList(this._UIIndex.uiBox_messageList)
    );

    super.init();
  }
  public start(): void {
    /** 测试用代码 */
    const messageList = this._componentMap.get(
      CommonLogicScreenComponentToken.MessageList
    ) as MessageList;
    setTimeout(() => {
      messageList.popMessage('需要盘子才能装⊂(・▽・⊂)');
    }, 1000);
    setTimeout(() => {
      messageList.popMessage('这个东西不能切(´• ω •`)ﾉ');
    }, 2000);
    setTimeout(() => {
      messageList.popMessage('当前订单列表里没有这个物品(。-`ω´-)✧ ');
      messageList.popMessage('测试消息3-2');
    }, 3000);

    super.start();
  }
}
