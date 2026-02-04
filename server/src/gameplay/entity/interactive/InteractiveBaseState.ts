import type { IState } from '../../../framework/common/StateMachine';
import type { BaseInteractive } from './BaseInteractive';

export abstract class InteractiveBaseState implements IState {
  /** 默认状态名称，必须重写 */
  abstract name: string;
  /** 上下文绑定 */
  public _interactive: BaseInteractive;

  constructor(interactive: BaseInteractive) {
    this._interactive = interactive;
  }

  onEnter(prevState: string): void {}

  onUpdate(deltaTime: number): void {}

  /** 可交互实体特有接口函数 */
  onInteract(player: GamePlayerEntity): void {}

  onExit(nextState: string): void {}
}
