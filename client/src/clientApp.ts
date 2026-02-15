import i18n from '@root/i18n';
import { Singleton } from './framework/Singleton';
import { UIMgr } from './gameplay/mgr/UIMgr';

// 当前i18n配置已支持语言自动切换，客户端下默认会跟随用户浏览器语言设置。例如，若用户浏览器语言为 zh-CN，则界面将显示为简体中文。
console.log('(client)：', i18n.t('welcome_game'));
console.log('(client)：', i18n.t('welcome_ap'));
console.log(
  '(client)：',
  i18n.t('navigator.language', { language: navigator.language })
);

export default class clientApp extends Singleton<clientApp>() {
  private _updateInterval: number = -1;

  private _lastUpdateTime: number = Date.now();

  private _tick: number = 60;

  constructor() {
    super();
  }
  public init(): void {
    console.log('(client): clientApp init');
    UIMgr.instance.init();
  }
  public start(): void {
    console.log('(client): clientApp start');
    UIMgr.instance.start();
    this.startUpdateInterval();
  }
  public startUpdateInterval(): void {
    this._updateInterval = setInterval(() => {
      const now = Date.now();
      const delta = now - this._lastUpdateTime;
      this._lastUpdateTime = now;
      this.update(delta);
    }, this._tick);
  }
  public update(delta: number): void {
    UIMgr.instance.update(delta);
  }
  public destroy(): void {
    UIMgr.instance.destroy();
    /** 停止更新间隔 */
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
      this._updateInterval = -1;
    }
  }
}
