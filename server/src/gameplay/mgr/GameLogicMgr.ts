import { Singleton } from '../../framework/common/Singleton';
import { LogicConst } from '../const/logicConst';
import type { BaseLogic } from '../gameLogic/BaseLogic';
import { MainLogic } from '../gameLogic/MainLogic';

export class GameLogicMgr extends Singleton<GameLogicMgr>() {
  private _gameLogicMap: Map<string, BaseLogic> = new Map();

  constructor() {
    super();
  }

  public init(): void {
    this.bindevent();
    this.addGameLogic(new MainLogic(), LogicConst.MainLogic);
  }

  private bindevent(): void {}

  public start(): void {
    /** 传递初始化至所有逻辑 */
    this._gameLogicMap.forEach((value) => {
      value.init();
    });
    /** 传递启动至所有逻辑 */
    this._gameLogicMap.forEach((value) => {
      value.start();
    });
  }
  public update(delta: number) {
    /** 传递更新至所有逻辑 */
    this._gameLogicMap.forEach((value) => {
      value.update(delta);
    });
  }
  public destroy(): void {
    /** 传递销毁至所有逻辑 */
    this._gameLogicMap.forEach((value) => {
      value.destroy();
    });
    GameLogicMgr.destroyInstance();
  }

  public addGameLogic(logic: BaseLogic, token: string): void {
    this._gameLogicMap.set(token, logic);
  }
  public getGameLogic(token: string): BaseLogic | undefined {
    return this._gameLogicMap.get(token);
  }
  public removeGameLogic(token: string): void {
    this._gameLogicMap.delete(token);
  }
}
