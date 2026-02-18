import { CommunicationConst } from '../../../../../shares/communicationConst';
import type { IState } from '../../../framework/common/StateMachine';
import { LogicScreenToken } from '../../const/LogicScreenConst';
import { GameplayState } from '../../const/stateConst';
import { Timer } from '../../const/Timer';
import { CommunicationMgr } from '../../mgr/CommunicationMgr';
import { ScoreMgr } from '../../mgr/ScoreMgr';
import { TimeMgr } from '../../mgr/TimeMgr';
import type { BaseLogic } from '../BaseLogic';

/** 游戏结算状态 */
export class GameOverState implements IState {
  /** 上下文绑定 */
  public gameLogic: BaseLogic | null;
  /** 状态名称 */
  public name: string = GameplayState.GameOverState;
  /** 最大结算时间 */
  private _maxTime: number = 15 * 1000;
  /** 等待计时器 */
  private _time: number = this._maxTime;

  constructor(logic: BaseLogic) {
    this.gameLogic = logic;
  }

  public onEnter(): void {
    console.log('(server): GameOverState onEnter');
    /** 设置类内计时器 */
    this._time = this._maxTime;
    /** 设置全局计时器 */
    TimeMgr.instance.setTime(Timer.SettlementCountDown, this._time);
    /** 切换客户端结算界面 */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_ChangeScreen,
      payload: LogicScreenToken.SettlementScreen,
    });
    /** 更新客户端计时器 */
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_Screen_SettlementScreen_CountDown_setTime,
      payload: this._time,
    });
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_Screen_SettlementScreen_Score_changeScore,
      payload: ScoreMgr.instance.getNowScore(),
    });
  }

  public onUpdate(deltaTime: number): void {
    this._time -= deltaTime;
    if (this._time <= 0) {
      this.gameLogic?.stateMachine?.transitionTo(GameplayState.WaitingState);
    }
  }

  public onExit(nextState: string): void {
    console.log('(server): GameOverState onExit');
  }
}
