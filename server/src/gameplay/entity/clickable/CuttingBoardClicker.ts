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
    this._entity.onClick(({ button, clicker }) => {
      if (
        !InteractiveMgr.instance
          .getInteractive(this._cuttingboardToken)
          ?.getAble()
      ) {
        return;
      }
      switch (button) {
        case GameButtonType.ACTION0: {
          (
            InteractiveMgr.instance.getInteractive(
              this._cuttingboardToken
            ) as CuttingBoard
          ).click();
          break;
        }
        case GameButtonType.ACTION1: {
          (
            InteractiveMgr.instance.getInteractive(
              this._cuttingboardToken
            ) as CuttingBoard
          ).interactCallBack(clicker);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
