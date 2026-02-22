import type { ScoreMgr } from '../../mgr/ScoreMgr';
import type { IScoreService } from '../interface/IScoreService';

export class ScoreServiceImpl implements IScoreService {
  constructor(private scoreMgr: ScoreMgr) {}
  addScore(value: number): void {
    this.scoreMgr.addScore(value);
  }
  resetScore(): void {
    this.scoreMgr.resetScore();
  }
  getNowScore(): number {
    return this.scoreMgr.getNowScore();
  }
}
