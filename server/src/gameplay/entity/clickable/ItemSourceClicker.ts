import { InteractiveMgr } from '../../mgr/InteractiveMgr';
import { BaseClickable } from './BaseClickable';

export class ItemSourceClicker extends BaseClickable {
  private _itemSourceToken: string;
  constructor(entity: GameEntity, itemSourceToken: string) {
    super(entity);
    this._itemSourceToken = itemSourceToken;
  }
  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(({ button, clicker }) => {
      if (button === GameButtonType.ACTION1) {
        InteractiveMgr.instance
          .getInteractive(this._itemSourceToken)
          ?.interactCallback(clicker);
      }
    });
  }
}
