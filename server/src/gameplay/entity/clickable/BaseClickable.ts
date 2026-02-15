import type { StateMachine } from '../../../framework/common/StateMachine';

export class BaseClickable {
  protected _entity: GameEntity;

  public _stateMachine?: StateMachine | null;

  /** 绑定场景中的可点击实体 */
  constructor(entity: GameEntity) {
    this._entity = entity;
  }

  /** 初始化接口 */
  public init(): void {}

  /** 启动接口 */
  public start(): void {}

  /** 更新接口 */
  public update(delta: number): void {}

  /** 销毁接口 */
  public destroy(): void {}
}
