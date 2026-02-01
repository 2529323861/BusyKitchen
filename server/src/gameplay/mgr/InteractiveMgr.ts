import { Singleton } from '../../framework/common/Singleton';

export class InteractiveMgr extends Singleton<InteractiveMgr>() {
  constructor() {
    super();
  }
  public init(): void {
    this.bindevent();
  }

  private bindevent(): void {}

  public start(): void {}
  public update(delta: number) {}
  public destroy(): void {}
}
