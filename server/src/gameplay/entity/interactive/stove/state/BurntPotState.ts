import type { IState } from '../../../../../framework/common/StateMachine';
import { StoveState } from '../../../../const/stateConst';
import { Container } from '../../../../di/Container';
import { SERVICE_TOKENS } from '../../../../di/tokens';
import { AnimationMgr } from '../../../../mgr/AnimationMgr';
import type { IAnimationService } from '../../../../service/interface/IAnimationService';
import type { StoveProgressbarAnimation } from '../../../AnimationEntity/StoveProgressbarAnimation';
import type { Stove } from '../Stove';

export class BurntPotState implements IState {
  name: string = StoveState.BurntPotState;
  /** 控制器引用 */
  private _interactive: Stove;

  /** 动画依赖 */
  private animationService: IAnimationService;

  constructor(controller: Stove) {
    this._interactive = controller;
    /** 注入动画依赖 */
    this.animationService = Container.instance.resolve<IAnimationService>(
      SERVICE_TOKENS.ANIMATION_SERVICE
    );
  }
  onEnter(prevState: string): void {
    /** 进度条动画切换 */
    (
      this.animationService.getAnimation(
        this._interactive._stoveProgressAnimationToken
      ) as StoveProgressbarAnimation
    )?.changeTo(this.name as StoveState);
  }
  onUpdate(deltaTime: number): void {}
  onExit(nextState: string): void {}
}
