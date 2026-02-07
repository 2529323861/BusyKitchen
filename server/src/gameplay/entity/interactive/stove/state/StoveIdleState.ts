import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';
import { AnimationMgr } from '../../../../mgr/AnimationMgr';
import type { StoveProgressbarAnimation } from '../../../AnimationEntity/StoveProgressbarAnimation';
import type { Stove } from '../Stove';

export class StoveIdleState implements IState {
  name: string = StoveState.StoveIdleState;
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
  }
  onUpdate(deltaTime: number): void {}
  onExit(nextState: string): void {}
}
