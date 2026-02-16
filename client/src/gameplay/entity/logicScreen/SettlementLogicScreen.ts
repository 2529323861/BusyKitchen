import { UiIndex_settlement } from '../../../../UiIndex/screens/UiIndex_settlement';
import { SettlementScreenComponentToken } from '../../const/UIComponentConst';
import { CountDown } from '../UIComponent/CountDown';
import { BaseLogicScreen } from './BaseLogicScreen';

export class SettlementLogicScreen extends BaseLogicScreen {
  private _UIIndex: UiIndex_settlement;
  constructor(uiScreen: UiScreen) {
    super(uiScreen);
    this._UIIndex = new UiIndex_settlement(uiScreen);
  }
  public init(): void {
    super.init();
    this.addComponent(
      SettlementScreenComponentToken.CountDown,
      new CountDown(this._UIIndex.uiText_CountDown)
    );
    this.bindevent();
  }

  private bindevent(): void {}
  public changeScore(score: number): void {
    this._UIIndex.uiText_score.textContent = score.toString();
  }
}
