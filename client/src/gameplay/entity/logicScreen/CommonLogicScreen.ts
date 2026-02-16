import { CommunicationConst } from '../../../../../shares/communicationConst';
import { UiIndex_common } from '../../../../UiIndex/screens/UiIndex_common';
import { EventEmitter } from '../../../framework/EventEmitter';
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
    super.init();
    /** 注册提示消息列表 */
    this.addComponent(
      CommonLogicScreenComponentToken.MessageList,
      new MessageList(this._UIIndex.uiBox_messageList)
    );
    this.bindevent();
  }

  private bindevent(): void {
    EventEmitter.instance.on(
      CommunicationConst.UI_Screen_CommonScreen_MessageList_popMessage,
      (payload) => {
        (
          this.getComponent(
            CommonLogicScreenComponentToken.MessageList
          ) as MessageList
        ).popMessage(payload);
      }
    );
  }
  public start(): void {
    super.start();
  }
}
