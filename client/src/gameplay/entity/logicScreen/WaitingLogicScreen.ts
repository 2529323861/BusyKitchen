import { CommunicationConst } from '../../../../../shares/communicationConst';
import { UiIndex_waiting } from '../../../../UiIndex/screens/UiIndex_waiting';
import { EventEmitter } from '../../../framework/EventEmitter';
import { WaitingScreenComponentToken } from '../../const/UIComponentConst';
import { CountDown } from '../UIComponent/CountDown';
import { BaseLogicScreen } from './BaseLogicScreen';

export class WaitingLogicScreen extends BaseLogicScreen {
  private _UIIndex: UiIndex_waiting;
  constructor(uiScreen: UiScreen) {
    super(uiScreen);
    this._UIIndex = new UiIndex_waiting(uiScreen);
  }
  public init(): void {
    super.init();
    this.addComponent(
      WaitingScreenComponentToken.CountDown,
      new CountDown(this._UIIndex.uiText_CountDown)
    );
    this.bindevent();
  }

  private bindevent(): void {
    EventEmitter.instance.on(
      CommunicationConst.UI_Screen_WaitingScreen_CountDown_setTime,
      (payload) => {
        (
          this.getComponent(WaitingScreenComponentToken.CountDown) as CountDown
        ).setTime(payload);
      }
    );
  }
}
