import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';

export class CookingState implements IState {
  name: string = StoveState.CookingState;
  onEnter(prevState: string): void {}
  onUpdate(deltaTime: number): void {}
  onExit(nextState: string): void {}
}
