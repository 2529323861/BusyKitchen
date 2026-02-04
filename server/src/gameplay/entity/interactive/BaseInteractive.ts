import type { InteractiveStateMachine } from './InteractiveStateMachine';

export class BaseInteractive {
  /** 场景中的交互点实体 */
  public _entity: GameEntity;

  public _stateMachine?: InteractiveStateMachine | null;

  constructor(entity: GameEntity) {
    /** 绑定场景中的交互点实体 */
    this._entity = entity;
    this.enable();
  }

  /** 启用交互点 */
  public enable(): void {
    this._entity.enableInteract = true;
  }

  /** 禁用交互点 */
  public disable(): void {
    this._entity.enableInteract = false;
  }

  /** 对交互半径进行封装 */
  get interactRadius(): number {
    return this._entity.interactRadius;
  }

  set interactRadius(value: number) {
    this._entity.interactRadius = value;
  }

  /** 初始化接口 */
  public init(): void {}

  /** 事件绑定 */
  public bindevent(): void {}

  /** 启动接口 */
  public start(): void {}

  /** 更新接口 */
  public update(delta: number): void {}

  /** 销毁接口 */
  public destory(): void {}
}
