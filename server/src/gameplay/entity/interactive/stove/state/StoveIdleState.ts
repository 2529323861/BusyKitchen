import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';

export class StoveIdleState implements IState {
  name: string = StoveState.StoveIdleState;
  onEnter(prevState: string): void {}
  onUpdate(deltaTime: number): void {}
  onExit(nextState: string): void {}
}
