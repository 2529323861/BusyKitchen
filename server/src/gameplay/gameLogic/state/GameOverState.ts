import type { IState } from '../../../framework/common/StateMachine';
import { GameplayState } from '../../const/stateConst';
import type { BaseLogic } from '../BaseLogic';

/** 游戏结算状态 */
export class GameOverState implements IState {
  /** 上下文绑定 */
  public gameLogic: BaseLogic | null;
  /** 状态名称 */
  public name: string = GameplayState.GameOverState;

  constructor(logic: BaseLogic) {
    this.gameLogic = logic;
  }

  public onEnter(): void {
    console.log('(server): GameOverState onEnter');
  }

  public onUpdate(deltaTime: number): void {}

  public onExit(nextState: string): void {
    console.log('(server): GameOverState onExit');
  }
}
