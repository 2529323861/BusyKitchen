import { Singleton } from '../../framework/common/Singleton';

export class ScoreMgr extends Singleton<ScoreMgr>() {
  private score: number = 0;
  constructor() {
    super();
  }
  public init() {}
  public start() {}
  public update(delta: number) {}
  public destroy() {}
  public getNowScore(): number {
    return this.score;
  }
  public addScore(value: number) {
    this.score += value;
  }
  public resetScore() {
    this.score = 0;
  }
}
