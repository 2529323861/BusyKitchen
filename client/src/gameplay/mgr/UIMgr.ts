import { Singleton } from '../../framework/Singleton';
import { LogicScreenToken } from '../const/LogicScreenConst';
import type { BaseLogicScreen } from '../entity/logicScreen/BaseLogicScreen';
import { GamingLogicScreen } from '../entity/logicScreen/GamingLogicScreen';

export class UIMgr extends Singleton<UIMgr>() {
  private _screenMap: Map<string, BaseLogicScreen> = new Map();
  constructor() {
    super();
  }
  public init(): void {
    this._screenMap.set(
      LogicScreenToken.GamingLogicScreen,
      new GamingLogicScreen()
    );
    this._screenMap.forEach((value) => {
      value.init();
    });
  }
  public start(): void {
    this._screenMap.forEach((value) => {
      value.start();
    });
  }
  public update(delta: number): void {
    this._screenMap.forEach((value) => {
      value.update(delta);
    });
  }
  public destory(): void {
    this._screenMap.forEach((value) => {
      value.destory();
    });
  }
}
