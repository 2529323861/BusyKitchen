import { CommunicationConst } from '../../../../../shares/communicationConst';
import type { IState } from '../../../framework/common/StateMachine';
import { LogicScreenToken } from '../../const/LogicScreenConst';
import { GameplayState } from '../../const/stateConst';
import { Timer } from '../../const/Timer';
import { CommunicationMgr } from '../../mgr/CommunicationMgr';
import { TimeMgr } from '../../mgr/TimeMgr';
import type { BaseLogic } from '../BaseLogic';

/** 游戏等待状态 */
export class WaitingState implements IState {
  /** 上下文绑定 */
  public gameLogic: BaseLogic | null;
  /** 状态名称 */
  public name: string = GameplayState.WaitingState;
  /** 最大等待时间 */
  private _maxTime: number = 5 * 1000;
  /** 等待计时器 */
  private _time: number = this._maxTime;
  /** 缓存上一次的时间，用于判断间隔是否达到一秒，避免频繁打印 */
  private lastTime: number = 0;

  constructor(logic: BaseLogic) {
    this.gameLogic = logic;
  }

  public onEnter(): void {
    console.log('(server): WaitingState onEnter');
    /** 重置类内计时器 */
    this._time = this._maxTime;
    this.lastTime = this._time;
    /** 重置全局计时器 */
    TimeMgr.instance.setTime(Timer.WaitingCountDown, this._time);
    /** 更新客户端倒计时UI */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_Screen_WaitingScreen_CountDown_setTime,
      payload: this._time,
    });
    /** 切换屏幕 */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_ChangeScreen,
      payload: LogicScreenToken.WaitingScreen,
    });
  }

  public onUpdate(deltaTime: number): void {
    this._time -= deltaTime;
    if (this.lastTime - this._time >= 1000) {
      this.lastTime = this._time;
      console.log(`(server): 等待状态倒计时 ${Math.round(this._time / 1000)}`);
    }
    if (this._time <= 0) {
      this.gameLogic?.stateMachine?.transitionTo(GameplayState.PlayingState);
    }
  }

  public onExit(nextState: string): void {
    console.log('(server): WaitingState onExit');
  }
}
