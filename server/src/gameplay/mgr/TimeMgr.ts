import { Singleton } from '../../framework/common/Singleton';
import { Timer } from '../const/Timer';

export class TimeMgr extends Singleton<TimeMgr>() {
  private _timeMap: Map<string, number> = new Map();
  constructor() {
    super();
  }
  public init() {
    this.setTime(Timer.GamingCountDown);
    this.setTime(Timer.WaitingCountDown);
    this.setTime(Timer.SettlementCountDown);
  }
  public start() {}
  public update(delta: number) {
    this._timeMap.forEach((value, key) => {
      this._timeMap.set(key, value - delta);
    });
  }
  public destroy() {}
  /**
   * 设置时间，如果不存在则创建
   * @param key 时间键
   * @param time 时间值，默认值为0
   */
  public setTime(key: string, time: number = 0) {
    this._timeMap.set(key, time);
  }
  public getTime(key: string): number {
    return this._timeMap.get(key) || 0;
  }
  public removeTime(key: string) {
    this._timeMap.delete(key);
  }
}
