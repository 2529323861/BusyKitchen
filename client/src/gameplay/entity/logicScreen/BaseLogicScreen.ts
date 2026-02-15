import type { BaseUIComponent } from '../UIComponent/BaseUIComponent';

export class BaseLogicScreen {
  /** 屏幕内组件 */
  protected _componentMap: Map<string, BaseUIComponent> = new Map();
  constructor() {}
  public init(): void {
    this._componentMap.forEach((value) => {
      value.init();
    });
  }
  /** 注册组件 */
  public addComponent(token: string, component: BaseUIComponent): void {
    this._componentMap.set(token, component);
  }
  /** 移除组件 */
  public removeComponent(token: string): void {
    this._componentMap.delete(token);
  }
  /** 获取组件 */
  public getComponent(token: string): BaseUIComponent | undefined {
    return this._componentMap.get(token);
  }

  public start(): void {
    this._componentMap.forEach((value) => {
      value.start();
    });
  }
  public update(delta: number): void {
    this._componentMap.forEach((value) => {
      value.update(delta);
    });
  }
  public destory(): void {
    console.log('(client): GameLogicScreen start');
    this._componentMap.forEach((value) => {
      value.start();
    });
  }
}
