export class BaseInteractive {
  /** 场景中的交互点实体 */
  private entity: GameEntity;

  constructor(entity: GameEntity) {
    /** 绑定场景中的交互点实体 */
    this.entity = entity;
    this.enable();
  }

  /** 启用交互点 */
  public enable(): void {
    this.entity.enableInteract = true;
  }

  /** 禁用交互点 */
  public disable(): void {
    this.entity.enableInteract = false;
  }

  /** 初始化接口 */
  public init(): void {}

  /** 启动接口 */
  public start(): void {}

  /** 更新接口 */
  public update(delta: number): void {}

  /** 销毁接口 */
  public destory(): void {}
}
