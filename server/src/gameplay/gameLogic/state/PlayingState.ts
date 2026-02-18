import { CommunicationConst } from '../../../../../shares/communicationConst';
import type { IState } from '../../../framework/common/StateMachine';
import { LogicScreenToken } from '../../const/LogicScreenConst';
import { GameplayState } from '../../const/stateConst';
import { Timer } from '../../const/Timer';
import { CommunicationMgr } from '../../mgr/CommunicationMgr';
import { OrderMgr } from '../../mgr/OrderMgr';
import { ScoreMgr } from '../../mgr/ScoreMgr';
import { TimeMgr } from '../../mgr/TimeMgr';
import type { BaseLogic } from '../BaseLogic';

/** 游戏进行中状态 */
export class PlayingState implements IState {
  /** 上下文绑定 */
  public gameLogic: BaseLogic | null;
  /** 状态名称 */
  public name: string = GameplayState.PlayingState;
  /** 最大游戏时间 */
  private _maxTime: number = 300 * 1000;
  /** 等待计时器 */
  private _time: number = this._maxTime;

  constructor(logic: BaseLogic) {
    this.gameLogic = logic;
  }

  public onEnter(): void {
    console.log('(server): PlayingState onEnter');
    /** 更新类内计时器 */
    this._time = this._maxTime;
    /** 更新全局计时器 */
    TimeMgr.instance.setTime(Timer.GamingCountDown, this._time);
    /** 设置订单派发器为启用 */
    OrderMgr.instance.active();
    /** 切换客户端屏幕 */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_ChangeScreen,
      payload: LogicScreenToken.GamingLogicScreen,
    });
    /** 更新客户端倒计时 */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_Screen_GamingLogicScreen_CountDown_setTime,
      payload: this._time,
    });
    /** 更新当前得分UI */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_Screen_GamingLogicScreen_Score_changeScore,
      payload: ScoreMgr.instance.getNowScore(),
    });
  }

  public onUpdate(deltaTime: number): void {
    this._time -= deltaTime;
    if (this._time <= 0) {
      this.gameLogic?.stateMachine?.transitionTo(GameplayState.GameOverState);
    }
  }

  public onExit(nextState: string): void {
    console.log('(server): PlayingState onExit');
    /** 停用订单派发器 */
    OrderMgr.instance.cleanOrders();
    OrderMgr.instance.inactive();
  }
}
