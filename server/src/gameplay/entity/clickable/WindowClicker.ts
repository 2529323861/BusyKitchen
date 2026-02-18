import { InteractiveMgr } from '../../mgr/InteractiveMgr';
import { BaseClickable } from './BaseClickable';

export class WindowClicker extends BaseClickable {
  private _windowToken: string;

  constructor(entity: GameEntity, windowToken: string) {
    super(entity);
    this._windowToken = windowToken;
  }
  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(({ button, clicker }) => {
      if (button === GameButtonType.ACTION1) {
        InteractiveMgr.instance
          .getInteractive(this._windowToken)
          ?.interactCallback(clicker);
      }
    });
  }
}
