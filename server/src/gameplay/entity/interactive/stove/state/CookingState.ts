import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';
import { AnimationMgr } from '../../../../mgr/AnimationMgr';
import type { StoveProgressbarAnimation } from '../../../AnimationEntity/StoveProgressbarAnimation';
import type { Stove } from '../Stove';

export class CookingState implements IState {
  name: string = StoveState.CookingState;
  /** 烹饪时间 */
  private COOKINGTIME = 7 * 1000;
  /** 计时器 */
  private _timer = this.COOKINGTIME;
  /** 控制器引用 */
  private _interactive: Stove;
  constructor(controller: Stove) {
    this._interactive = controller;
  }
  onEnter(prevState: string): void {
    /** 进度条动画切换 */
    (
      AnimationMgr.instance.getAnimation(
        this._interactive._stoveProgressAnimationToken
      ) as StoveProgressbarAnimation
    )?.changeTo(this.name as StoveState);
    console.log('(server): 开始烹饪');
    this._timer = this.COOKINGTIME;
  }
  onUpdate(deltaTime: number): void {
    this._timer -= deltaTime;
    if (this._timer <= 0) {
      console.log('(server): 锅炉烹饪完成');
      this._interactive._stateMachine?.transitionTo(
        StoveState.CookingFinishState
      );
    }
  }
  onExit(nextState: string): void {}
}
