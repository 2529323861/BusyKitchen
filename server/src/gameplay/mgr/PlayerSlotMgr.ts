import { Singleton } from '../../framework/common/Singleton';

export class PlayerSlotMgr extends Singleton<PlayerSlotMgr>() {
  constructor() {
    super();
  }
  public init(): void {
    this.bindevent();
  }

  private bindevent(): void {
    world.onPlayerJoin(() => {});
  }

  public start(): void {}

  public update(delta: number): void {}

  public destory(): void {}
}
