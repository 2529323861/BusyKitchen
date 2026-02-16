import { CommunicationConst } from '../../../../../shares/communicationConst';
import { UiIndex_gaming } from '../../../../UiIndex/screens/UiIndex_gaming';
import { EventEmitter } from '../../../framework/EventEmitter';
import { GamingLogicScreenComponentToken } from '../../const/UIComponentConst';
import { CountDown } from '../UIComponent/CountDown';
import { OrderList } from '../UIComponent/OrderList/OrderList';
import { BaseLogicScreen } from './BaseLogicScreen';

export class GamingLogicScreen extends BaseLogicScreen {
  /** 节点索引 */
  private _UIIndex: UiIndex_gaming;

  constructor(uiScreen: UiScreen) {
    super(uiScreen);
    this._UIIndex = new UiIndex_gaming(uiScreen);
  }

  public init(): void {
    super.init();
    console.log('(client): GameLogicScreen init');
    /** 注册订单列表 */
    this.addComponent(
      GamingLogicScreenComponentToken.OrderList,
      new OrderList(this._UIIndex.uiBox_orderList)
    );
    /** 注册倒计时 */
    this.addComponent(
      GamingLogicScreenComponentToken.CountDown,
      new CountDown(this._UIIndex.uiText_CountDown)
    );

    /** 绑定事件 */
    this.bindevent();
  }
  private bindevent(): void {}

  public start(): void {
    super.start();
    console.log('(client): GameLogicScreen start');
  }
  public update(delta: number): void {
    super.update(delta);
  }
  public destroy(): void {
    super.destroy();
  }
  /** 更新得分 */
  public changeScore(score: number): void {
    this._UIIndex.uiText_score.textContent = score.toString();
  }
}
