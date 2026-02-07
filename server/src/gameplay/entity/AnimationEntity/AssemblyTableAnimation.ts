import type { IItemData } from '../../jsonData/DataInterface';
import { BaseAnimationEntity } from './BaseAnimationEntity';

export class AssemblyTableAnimation extends BaseAnimationEntity {
  /** 基准位置 */
  private _pos: GameVector3;

  /** 适用栈尺寸 */
  private STACK_CAPCITY = 5;

  /** 绑定实体 */
  private _entitys: Array<GameEntity | null> = new Array(this.STACK_CAPCITY);

  constructor(pos: GameVector3) {
    super();
    this._pos = pos.add(new GameVector3(0.5, 1, 0.5));
  }
  public init(): void {
    this._entitys = new Array(this.STACK_CAPCITY);
    for (let i = 0; i < this.STACK_CAPCITY; i++) {
      this._entitys[i] = world.createEntity({
        position: this._pos,
        collides: false,
        mesh: 'mesh/default.vb',
        meshScale: new GameVector3(0.2 / 16, 0.2 / 16, 0.2 / 16),
        gravity: false,
        fixed: true,
      });
    }
  }

  public changeAnimation(stack: IItemData[]): void {
    this._entitys.reduce((acc, value, index) => {
      /** 设置当前实体高度 */
      if (value) {
        value.position.y = this._pos.y + acc;
      }
      /** 累积值 */
      if (index >= stack.length) {
        /** 如果越界，说明栈不足5，则此时累积值不变，材质为空 */
        if (value) {
          value.mesh = 'mesh/default.vb';
        }
        return acc;
      } else {
        if (value) {
          value.mesh = stack[index].src;
        }
        return acc + stack[index].hight;
      }
    }, 0);
  }

  public destroy(): void {
    this._entitys.forEach((value) => {
      value?.destroy();
    });
  }
}
