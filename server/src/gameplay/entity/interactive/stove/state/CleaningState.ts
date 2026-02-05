import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';
import type { Stove } from '../Stove';

export class CleaningState implements IState {
  name: string = StoveState.CleaningState;
  /** 控制器引用 */
  private _interactive: Stove;
  constructor(controller: Stove) {
    this._interactive = controller;
  }
  onEnter(prevState: string): void {}
  onUpdate(deltaTime: number): void {}
  onExit(nextState: string): void {}
}
