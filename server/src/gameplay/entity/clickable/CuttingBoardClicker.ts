import { InteractiveMgr } from '../../mgr/InteractiveMgr';
import type { CuttingBoard } from '../interactive/cuttingBoard/CuttingBoard';
import { BaseClickable } from './BaseClickable';

export class CuttingBoardClicker extends BaseClickable {
  private _cuttingboardToken: string;
  constructor(entity: GameEntity, cuttingboardToken: string) {
    super(entity);
    this._cuttingboardToken = cuttingboardToken;
  }

  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(() => {
      (
        InteractiveMgr.instance.getInteractive(
          this._cuttingboardToken
        ) as CuttingBoard
      ).click();
    });
  }
}
