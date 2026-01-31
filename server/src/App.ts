import i18n from '@root/i18n';
import { Singleton } from './framework/common/Singleton';

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

  public start(): void {
    console.log('(server)：App init');
    this.startUpdateInterval();
  }

  private startUpdateInterval(): void {
    this._updateInterval = setInterval(() => {
      const now = Date.now();
      const delta = now - this._lastUpdateTime;
      this._lastUpdateTime = now;
      this.update(delta);
    }, this._tick);
  }

  private update(delta: number): void {}

  private destroy(): void {}
}
