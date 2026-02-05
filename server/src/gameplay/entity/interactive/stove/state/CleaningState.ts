import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';
import type { Stove } from '../Stove';

export class CleaningState implements IState {
  name: string = StoveState.CleaningState;
  /** 最大清晰时间 */
  private COOKINGTIME = 5 * 1000;
  /** 计时器 */
  private _timer = this.COOKINGTIME;
  /** 控制器引用 */
  private _interactive: Stove;
  constructor(controller: Stove) {
    this._interactive = controller;
  }
  onEnter(prevState: string): void {
    this._timer = this.COOKINGTIME;
  }
  onUpdate(deltaTime: number): void {
    this._timer -= deltaTime;
    if (this._timer <= 0) {
      console.log('(server): 锅炉清洗完毕');
      this._interactive._stateMachine?.transitionTo(StoveState.StoveIdleState);
    }
  }
  onExit(nextState: string): void {}
}
