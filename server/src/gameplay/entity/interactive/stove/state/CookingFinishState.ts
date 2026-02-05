import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';

export class CookingFinishState implements IState {
  name: string = StoveState.CookingFinishState;
  onEnter(prevState: string): void {}
  onUpdate(deltaTime: number): void {}
  onExit(nextState: string): void {}
}
