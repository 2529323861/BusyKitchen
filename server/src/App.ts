import i18n from '@root/i18n';
import { Singleton } from './framework/common/Singleton';
import { GameLogicMgr } from './gameplay/mgr/GameLogicMgr';
import { InteractiveMgr } from './gameplay/mgr/InteractiveMgr';
import { JsonDataMgr } from './gameplay/mgr/JsonDataMgr';
import { PlayerEntityMgr } from './gameplay/mgr/PlayerEntityMgr';
import { PlayerSlotMgr } from './gameplay/mgr/PlayerSlotMgr';
import { ClickableMgr } from './gameplay/mgr/ClickableMgr';
import { AnimationMgr } from './gameplay/mgr/AnimationMgr';
import { CommunicationMgr } from './gameplay/mgr/CommunicationMgr';
import { EventEmitter } from './framework/common/EventEmitter';

// 由于服务端中用户群体广泛，来源多样，建议在每个 t 函数中显式传入当前用户的语言标识，以确保多语言内容能够正确匹配用户所需的语言版本。
console.log('(server)：', i18n.t('welcome_game', { lng: 'zh-CN' }));
console.log('(server)：', i18n.t('welcome_ap', { lng: 'en' }));

export class App extends Singleton<App>() {
  private _updateInterval: number = -1;
  private _lastUpdateTime: number = Date.now();
  private _tick: number = 60;

  constructor() {
    super();
    console.log('(server)：App constructor');
  }

  /** 传递初始化 */
  public init(): void {
    console.log('(server)：App init');
    JsonDataMgr.instance.init();
    GameLogicMgr.instance.init();
    InteractiveMgr.instance.init();
    ClickableMgr.instance.init();
    PlayerEntityMgr.instance.init();
    PlayerSlotMgr.instance.init();
    AnimationMgr.instance.init();
    CommunicationMgr.instance.init();
  }

  /** 传递启动 */
  public start(): void {
    console.log('(server)：App start');
    JsonDataMgr.instance.start();
    GameLogicMgr.instance.start();
    InteractiveMgr.instance.start();
    ClickableMgr.instance.start();
    PlayerEntityMgr.instance.start();
    PlayerSlotMgr.instance.start();
    AnimationMgr.instance.start();
    CommunicationMgr.instance.start();

    /** 启动更新间隔 */
    this.startUpdateInterval();
  }

  /** 更新间隔 */
  private startUpdateInterval(): void {
    this._updateInterval = setInterval(() => {
      const now = Date.now();
      const delta = now - this._lastUpdateTime;
      this._lastUpdateTime = now;
      this.update(delta);
    }, this._tick);
  }

  /** 传递更新 */
  private update(delta: number): void {
    JsonDataMgr.instance.update(delta);
    GameLogicMgr.instance.update(delta);
    InteractiveMgr.instance.update(delta);
    ClickableMgr.instance.update(delta);
    PlayerEntityMgr.instance.update(delta);
    PlayerSlotMgr.instance.update(delta);
    AnimationMgr.instance.update(delta);
    CommunicationMgr.instance.update(delta);
  }

  /** 传递销毁 */
  private destroy(): void {
    GameLogicMgr.instance.destroy();
    ClickableMgr.instance.destroy();
    InteractiveMgr.instance.destroy();
    PlayerEntityMgr.instance.destroy();
    PlayerSlotMgr.instance.destroy();
    AnimationMgr.instance.destroy();
    CommunicationMgr.instance.destroy();
    EventEmitter.destroyInstance();

    /** 数据最后销毁 */
    JsonDataMgr.instance.destroy();
    /** 停止更新间隔 */
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
      this._updateInterval = -1;
    }
  }
}
