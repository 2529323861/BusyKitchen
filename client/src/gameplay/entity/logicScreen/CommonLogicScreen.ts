import { UiIndex_common } from '../../../../UiIndex/screens/UiIndex_common';
import { BaseLogicScreen } from './BaseLogicScreen';

export class CommonLogicScreen extends BaseLogicScreen {
  private _UIIndex: UiIndex_common;
  constructor(uiScreen: UiScreen) {
    super(uiScreen);
    this._UIIndex = new UiIndex_common(uiScreen);
  }
}
