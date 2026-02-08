import { Singleton } from '../../framework/Singleton';

export class UIMgr extends Singleton<UIMgr>() {
  private _screenMap: Map<string, UiScreen> = new Map();
  constructor() {
    super();
  }
  public init(): void {}
  public start(): void {}
  public update(delta: number): void {}
  public destory(): void {}
}
