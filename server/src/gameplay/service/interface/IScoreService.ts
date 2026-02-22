export interface IScoreService {
  /** 增加分数 */
  addScore(value: number): void;
  /** 重置分数 */
  resetScore(): void;
  /** 获取分数 */
  getNowScore(): number;
}
