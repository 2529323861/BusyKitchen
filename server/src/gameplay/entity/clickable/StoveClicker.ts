import { InteractiveMgr } from '../../mgr/InteractiveMgr';
import { BaseClickable } from './BaseClickable';

export class StoveClicker extends BaseClickable {
  private _stoveToken: string;

  constructor(entity: GameEntity, stoveToken: string) {
    super(entity);
    this._stoveToken = stoveToken;
  }
  public init(): void {
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onClick(({ button, clicker }) => {
      if (
        !InteractiveMgr.instance.getInteractive(this._stoveToken)?.getAble()
      ) {
        return;
      }
      if (button === GameButtonType.ACTION1) {
        InteractiveMgr.instance
          .getInteractive(this._stoveToken)
          ?.interactCallback(clicker);
      }
    });
  }
}
