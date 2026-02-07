import { InteractiveMgr } from '../../mgr/InteractiveMgr';
import { BaseClickable } from './BaseClickable';

export class DustbinClicker extends BaseClickable {
  private _dustbinToken: string;

  constructor(entity: GameEntity, dustbinToken: string) {
    super(entity);
    this._dustbinToken = dustbinToken;
  }
  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(({ button, clicker }) => {
      if (button === GameButtonType.ACTION1) {
        InteractiveMgr.instance
          .getInteractive(this._dustbinToken)
          ?.interactCallback(clicker);
      }
    });
  }
}
