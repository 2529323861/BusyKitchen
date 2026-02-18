import { InteractiveMgr } from '../../mgr/InteractiveMgr';
import type { AssemblyTable } from '../interactive/AssemblyTable';
import { BaseClickable } from './BaseClickable';

export class AssemblyTableClicker extends BaseClickable {
  private _assemblyTableToken: string;

  constructor(entity: GameEntity, assemblyTableToken: string) {
    super(entity);
    this._assemblyTableToken = assemblyTableToken;
  }
  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(({ button, clicker }) => {
      if (
        !InteractiveMgr.instance
          .getInteractive(this._assemblyTableToken)
          ?.getAble()
      ) {
        return;
      }
      switch (button) {
        case GameButtonType.ACTION0: {
          (
            InteractiveMgr.instance.getInteractive(
              this._assemblyTableToken
            ) as AssemblyTable
          ).assemble(clicker);
          break;
        }
        case GameButtonType.ACTION1: {
          (
            InteractiveMgr.instance.getInteractive(
              this._assemblyTableToken
            ) as AssemblyTable
          ).interactCallback(clicker);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
