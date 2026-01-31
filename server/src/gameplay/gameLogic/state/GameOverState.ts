import type { IState } from '../../../framework/common/StateMachine';
import { GameplayState } from '../../const/stateConst';

/** 游戏结算状态 */
export class GameOverState implements IState {
  public name: string = GameplayState.GameOverState;

  public onEnter(): void {
    console.log('(server): GameOverState onEnter');
  }

  public onUpdate(deltaTime: number): void {}

  public onExit(nextState: string): void {
    console.log('(server): GameOverState onExit');
  }
}
