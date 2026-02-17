import { CommunicationConst } from '../../../../../shares/communicationConst';
import type { IState } from '../../../framework/common/StateMachine';
import { LogicScreenToken } from '../../const/LogicScreenConst';
import { GameplayState } from '../../const/stateConst';
import { CommunicationMgr } from '../../mgr/CommunicationMgr';
import { OrderMgr } from '../../mgr/OrderMgr';
import type { BaseLogic } from '../BaseLogic';

/** 游戏进行中状态 */
export class PlayingState implements IState {
  /** 上下文绑定 */
  public gameLogic: BaseLogic | null;
  /** 状态名称 */
  public name: string = GameplayState.PlayingState;

  constructor(logic: BaseLogic) {
    this.gameLogic = logic;
  }

  public onEnter(): void {
    console.log('(server): PlayingState onEnter');
    OrderMgr.instance.active();
    CommunicationMgr.instance.sendBroad({
      token: CommunicationConst.UI_ChangeScreen,
      payload: LogicScreenToken.GamingLogicScreen,
    });
  }

  public onUpdate(deltaTime: number): void {}

  public onExit(nextState: string): void {
    console.log('(server): PlayingState onExit');
  }
}
