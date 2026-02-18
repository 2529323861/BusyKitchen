import { CommunicationConst } from '../../../../shares/communicationConst';
import type { IInit_response } from '../../../../shares/communicationInterface';
import { EventEmitter } from '../../framework/EventEmitter';
import { Singleton } from '../../framework/Singleton';
import { LogicScreenToken } from '../const/LogicScreenConst';
import {
  GamingLogicScreenComponentToken,
  SettlementScreenComponentToken,
  WaitingScreenComponentToken,
} from '../const/UIComponentConst';
import type { BaseLogicScreen } from '../entity/logicScreen/BaseLogicScreen';
import { CommonLogicScreen } from '../entity/logicScreen/CommonLogicScreen';
import { GamingLogicScreen } from '../entity/logicScreen/GamingLogicScreen';
import { SettlementLogicScreen } from '../entity/logicScreen/SettlementLogicScreen';
import { WaitingLogicScreen } from '../entity/logicScreen/WaitingLogicScreen';
import type { CountDown } from '../entity/UIComponent/CountDown';
import type {
  EntryConfig,
  OrderList,
} from '../entity/UIComponent/OrderList/OrderList';
import { CommunicationMgr } from './CommunicationMgr';

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

    this.bindevent();

    this._screenMap.forEach((value) => {
      value.init();
    });
  }
  private bindevent() {
    EventEmitter.instance.on(CommunicationConst.UI_ChangeScreen, (payload) => {
      this.changeShowScreen(payload);
    });
    EventEmitter.instance.on(CommunicationConst.Init_Response, (payload) => {
      CommunicationMgr.instance.isRegisted = true;
      payload = payload as IInit_response;
      this.changeShowScreen(payload.screen);
      const dataMap = new Map(payload.data);
      console.log(`${payload.data}`);
      switch (payload.screen) {
        case LogicScreenToken.GamingLogicScreen:
          (
            (
              this.getScreen(
                LogicScreenToken.GamingLogicScreen
              ) as GamingLogicScreen
            ).getComponent(
              GamingLogicScreenComponentToken.CountDown
            ) as CountDown
          ).setTime(dataMap.get('countDown') as number);
          for (const i of dataMap.get('orderList') as Array<EntryConfig>) {
            (
              (
                this.getScreen(
                  LogicScreenToken.GamingLogicScreen
                ) as GamingLogicScreen
              ).getComponent(
                GamingLogicScreenComponentToken.OrderList
              ) as OrderList
            ).addEntry(i);
          }
          (
            this.getScreen(
              LogicScreenToken.GamingLogicScreen
            ) as GamingLogicScreen
          ).changeScore(dataMap.get('score') as number);
          break;
        case LogicScreenToken.SettlementScreen:
          (
            this.getScreen(
              LogicScreenToken.SettlementScreen
            ) as SettlementLogicScreen as SettlementLogicScreen
          ).changeScore(dataMap.get('score') as number);
          (
            (
              this.getScreen(
                LogicScreenToken.SettlementScreen
              ) as SettlementLogicScreen
            ).getComponent(
              SettlementScreenComponentToken.CountDown
            ) as CountDown
          ).setTime(dataMap.get('countDown') as number);
          break;
        case LogicScreenToken.WaitingScreen:
          (
            (
              this.getScreen(
                LogicScreenToken.WaitingScreen
              ) as WaitingLogicScreen
            ).getComponent(WaitingScreenComponentToken.CountDown) as CountDown
          ).setTime(dataMap.get('countDown') as number);
          break;
        default:
          break;
      }
    });
  }

  public start(): void {
    (
      this.getScreen(LogicScreenToken.CommonScreen) as CommonLogicScreen
    ).enableUpdate = true;
    (this.getScreen(LogicScreenToken.CommonScreen) as CommonLogicScreen).show();

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
  /** 切换显示的屏幕 */
  public changeShowScreen(payload: LogicScreenToken): void {
    /** 隐藏并停止更新所有屏幕 */
    (
      this.getScreen(LogicScreenToken.GamingLogicScreen) as GamingLogicScreen
    ).enableUpdate = false;
    (
      this.getScreen(LogicScreenToken.WaitingScreen) as WaitingLogicScreen
    ).enableUpdate = false;
    (
      this.getScreen(LogicScreenToken.SettlementScreen) as SettlementLogicScreen
    ).enableUpdate = false;
    (
      this.getScreen(LogicScreenToken.GamingLogicScreen) as GamingLogicScreen
    ).hide();
    (
      this.getScreen(LogicScreenToken.WaitingScreen) as WaitingLogicScreen
    ).hide();
    (
      this.getScreen(LogicScreenToken.SettlementScreen) as SettlementLogicScreen
    ).hide();
    /** 显示并更新指定屏幕 */
    switch (payload as LogicScreenToken) {
      case LogicScreenToken.GamingLogicScreen:
        (
          this.getScreen(
            LogicScreenToken.GamingLogicScreen
          ) as GamingLogicScreen
        ).enableUpdate = true;
        (
          this.getScreen(
            LogicScreenToken.GamingLogicScreen
          ) as GamingLogicScreen
        ).show();
        break;
      case LogicScreenToken.WaitingScreen:
        (
          this.getScreen(LogicScreenToken.WaitingScreen) as WaitingLogicScreen
        ).enableUpdate = true;
        (
          this.getScreen(LogicScreenToken.WaitingScreen) as WaitingLogicScreen
        ).show();
        break;
      case LogicScreenToken.SettlementScreen:
        (
          this.getScreen(
            LogicScreenToken.SettlementScreen
          ) as SettlementLogicScreen
        ).enableUpdate = true;
        (
          this.getScreen(
            LogicScreenToken.SettlementScreen
          ) as SettlementLogicScreen
        ).show();
        break;
    }
  }
}
