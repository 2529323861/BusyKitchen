import { StoveState } from '../../const/stateConst';
import { BaseAnimationEntity } from './BaseAnimationEntity';

export class StoveProgressbarAnimation extends BaseAnimationEntity {
  private _entity: GameEntity | null = null;

  private _pos: GameVector3;

  constructor(pos: GameVector3) {
    super();
    this._pos = pos.add(new GameVector3(0.5, 1, 0.5));
  }
  public init(): void {
    this._entity = world.createEntity({
      position: this._pos,
      collides: false,
      mesh: 'mesh/default.vb',
      meshScale: new GameVector3(0.2 / 16, 0.2 / 16, 0.2 / 16),
      gravity: false,
      fixed: true,
    });
  }
  public changeTo(state: StoveState): void {
    switch (state) {
      case StoveState.CookingState: {
        if (this._entity) {
          this._entity!.mesh = 'mesh/progressbar_cooking.vb';
          this._entity.motion.loadByName('main').play();
        }
        break;
      }
      case StoveState.CookingFinishState: {
        if (this._entity) {
          this._entity!.mesh = 'mesh/progressbar_burning.vb';
          this._entity.motion.loadByName('main').play();
        }
        break;
      }
      case StoveState.CleaningState: {
        if (this._entity) {
          this._entity!.mesh = 'mesh/progressbar_cleaning.vb';
          this._entity.motion.loadByName('main').play();
        }
        break;
      }
      case StoveState.BurntPotState: {
        if (this._entity) {
          this._entity!.mesh = 'mesh/progressbar_burnt.vb';
        }
        break;
      }
      default: {
        if (this._entity) {
          this._entity!.mesh = 'mesh/default.vb';
        }
        break;
      }
    }
  }
}
