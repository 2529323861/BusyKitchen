import type { AssemblyTable } from '../interactive/AssemblyTable';
import { BaseClickable } from './BaseClickable';

export class AssemblyTableClicker extends BaseClickable {
  private _assemblyTable: AssemblyTable;

  constructor(entity: GameEntity, assemblyTable: AssemblyTable) {
    super(entity);
    this._assemblyTable = assemblyTable;
  }
  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(() => {
      this._assemblyTable.assemble();
    });
  }
}
