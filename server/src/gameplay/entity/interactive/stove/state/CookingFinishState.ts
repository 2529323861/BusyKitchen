import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';
import { AnimationMgr } from '../../../../mgr/AnimationMgr';
import type { StoveProgressbarAnimation } from '../../../AnimationEntity/StoveProgressbarAnimation';
import type { Stove } from '../Stove';

export class CookingFinishState implements IState {
  name: string = StoveState.CookingFinishState;
  /** 最大完成时间 */
  private COOKINGTIME = 6 * 1000;
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
    this._timer = this.COOKINGTIME;
  }
  onUpdate(deltaTime: number): void {
    this._timer -= deltaTime;
    if (this._timer <= 0) {
      console.log('(server): 锅炉烧焦了');
      this._interactive._stateMachine?.transitionTo(StoveState.BurntPotState);
    }
  }
  onExit(nextState: string): void {}
}
