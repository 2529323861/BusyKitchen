import { BaseAnimationEntity } from './BaseAnimationEntity';

export class CuttingBoardAnimation extends BaseAnimationEntity {
  /** 基准位置 */
  private _pos: GameVector3;

  /** 动画实体 */
  private _AnimationEntity: GameEntity | null = null;

  constructor(pos: GameVector3) {
    super();
    this._pos = pos;
  }
  public init(): void {
    this._AnimationEntity = world.createEntity({
      position: this._pos,
      collides: false,
      mesh: 'mesh/default.vb',
      meshScale: new GameVector3(0.2, 0.2, 0.2),
      gravity: false,
      fixed: true,
    });
  }
  /** 改变显示材质 */
  public changeAnimation(mesh: GameModelAssets) {
    if (this._AnimationEntity) {
      this._AnimationEntity!.mesh = mesh;
    }
  }

  public destroy(): void {
    this._AnimationEntity?.destroy();
  }
}
