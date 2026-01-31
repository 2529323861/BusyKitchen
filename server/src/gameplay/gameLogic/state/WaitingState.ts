import type { IState } from '../../../framework/common/StateMachine';
import { GameplayState } from '../../const/stateConst';

/** 游戏等待状态 */
export class WaitingState implements IState {
  public name: string = GameplayState.WaitingState;

  public onEnter(): void {
    console.log('(server): WaitingState onEnter');
  }

  public onUpdate(deltaTime: number): void {}

  public onExit(nextState: string): void {
    console.log('(server): WaitingState onExit');
  }
}
