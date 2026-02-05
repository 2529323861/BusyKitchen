import type { IState } from '../../../../../framework/common/StateMachine';
import { CuttingBoardState } from '../../../../const/stateConst';
import type { CuttingBoard } from '../CuttingBoard';

export class CuttingFinishState implements IState {
  public name: string = CuttingBoardState.CuttingFinishState;
  /** 控制器引用 */
  private _interactive: CuttingBoard;

  constructor(controller: CuttingBoard) {
    /** 控制器绑定 */
    this._interactive = controller;
  }
  onEnter(prevState: string): void {}
  onUpdate(deltaTime: number): void {}
  onExit(nextState: string): void {}
}
