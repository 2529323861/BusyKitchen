import { Singleton } from '../../framework/Singleton';
import { LogicScreenToken } from '../const/LogicScreenConst';
import type { BaseLogicScreen } from '../entity/logicScreen/BaseLogicScreen';
import { CommonLogicScreen } from '../entity/logicScreen/CommonLogicScreen';
import { GamingLogicScreen } from '../entity/logicScreen/GamingLogicScreen';
import { SettlementLogicScreen } from '../entity/logicScreen/SettlementLogicScreen';
import { WaitingLogicScreen } from '../entity/logicScreen/WaitingLogicScreen';

export class UIMgr extends Singleton<UIMgr>() {
  private _screenMap: Map<string, BaseLogicScreen> = new Map();

  constructor() {
    super();
  }

  public init(): void {
    /** 注册通用屏幕 */
    this.addScreen(
      LogicScreenToken.CommonScreen,
      new CommonLogicScreen(
        UiScreen.getAllScreen().filter((screen) => {
          return screen.name === 'common';
        })[0]
      )
    );
    /** 注册游戏屏幕 */
    this.addScreen(
      LogicScreenToken.GamingLogicScreen,
      new GamingLogicScreen(
        UiScreen.getAllScreen().filter((screen) => {
          return screen.name === 'gaming';
        })[0]
      )
    );
    /** 注册等待屏幕 */
    this.addScreen(
      LogicScreenToken.WaitingScreen,
      new WaitingLogicScreen(
        UiScreen.getAllScreen().filter((screen) => {
          return screen.name === 'waiting';
        })[0]
      )
    );
    /** 注册结算屏幕 */
    this.addScreen(
      LogicScreenToken.SettlementScreen,
      new SettlementLogicScreen(
        UiScreen.getAllScreen().filter((screen) => {
          return screen.name === 'settlement';
        })[0]
      )
    );

    this._screenMap.forEach((value) => {
      value.init();
    });
  }

  public start(): void {
    (
      this.getScreen(LogicScreenToken.GamingLogicScreen) as GamingLogicScreen
    ).enableUpdate = true;
    (
      this.getScreen(LogicScreenToken.GamingLogicScreen) as GamingLogicScreen
    ).show();

    this._screenMap.forEach((value) => {
      value.start();
    });
  }

  public update(delta: number): void {
    this._screenMap.forEach((value, index) => {
      if (value.enableUpdate) {
        value.update(delta);
      }
    });
  }

  public destroy(): void {
    this._screenMap.forEach((value) => {
      value.destroy();
    });
    UIMgr.destroyInstance();
  }
  /** 使用token注册屏幕 */
  public addScreen(token: string, screen: BaseLogicScreen): void {
    this._screenMap.set(token, screen);
  }
  /** 使用token移除屏幕 */
  public removeScreen(token: string): void {
    this._screenMap.delete(token);
  }
  /** 使用token获取屏幕 */
  public getScreen(token: string): BaseLogicScreen | undefined {
    return this._screenMap.get(token);
  }
}
