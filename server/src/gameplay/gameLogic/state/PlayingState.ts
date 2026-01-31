import type { IState } from '../../../framework/common/StateMachine';
import { GameplayState } from '../../const/stateConst';

/** 游戏进行中状态 */
export class PlayingState implements IState {
  public name: string = GameplayState.PlayingState;

  public onEnter(): void {
    console.log('(server): PlayingState onEnter');
  }

  public onUpdate(deltaTime: number): void {}

  public onExit(nextState: string): void {
    console.log('(server): PlayingState onExit');
  }
}
