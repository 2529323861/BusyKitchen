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
    this._entity.onClick(() => {
      (
        InteractiveMgr.instance.getInteractive(
          this._assemblyTableToken
        ) as AssemblyTable
      ).assemble();
    });
  }
}
