import type { CuttingBoard } from '../interactive/cuttingBoard/CuttingBoard';
import { BaseClickable } from './BaseClickable';

export class CuttingBoardClicker extends BaseClickable {
  /** 绑定可交互刀板 */
  private _cuttingboard: CuttingBoard;
  constructor(entity: GameEntity, cuttingboard: CuttingBoard) {
    super(entity);
    this._cuttingboard = cuttingboard;
  }

  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(() => {
      this._cuttingboard.click();
    });
  }
}
