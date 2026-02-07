import { Singleton } from '../../framework/common/Singleton';
import { AnimationConst } from '../const/AnimationConst';
import { AssemblyTableAnimation } from '../entity/AnimationEntity/AssemblyTableAnimation';
import type { BaseAnimationEntity } from '../entity/AnimationEntity/BaseAnimationEntity';
import { CuttingBoardAnimation } from '../entity/AnimationEntity/CuttingBoardAnimation';
import type { BaseClickable } from '../entity/clickable/BaseClickable';

export class AnimationMgr extends Singleton<AnimationMgr>() {
  private _animationMap: Map<string, BaseAnimationEntity> = new Map();

  constructor() {
    super();
  }
  public init(): void {
    /** 注册一号刀板动画 */
    this.addAnimation(
      AnimationConst.CuttingBoardAnimation1,
      new CuttingBoardAnimation(new GameVector3(38, 9, 41))
    );
    /** 注册二号刀板动画 */
    this.addAnimation(
      AnimationConst.CuttingBoardAnimation2,
      new CuttingBoardAnimation(new GameVector3(39, 9, 41))
    );
    /** 注册三号刀板动画 */
    this.addAnimation(
      AnimationConst.CuttingBoardAnimation3,
      new CuttingBoardAnimation(new GameVector3(40, 9, 41))
    );
    /** 注册四号刀板动画 */
    this.addAnimation(
      AnimationConst.CuttingBoardAnimation4,
      new CuttingBoardAnimation(new GameVector3(41, 9, 41))
    );
    /** 注册五号刀板动画 */
    this.addAnimation(
      AnimationConst.CuttingBoardAnimation5,
      new CuttingBoardAnimation(new GameVector3(42, 9, 41))
    );
    /** 注册一号组装台动画 */
    this.addAnimation(
      AnimationConst.AssemblyTableAnimation1,
      new AssemblyTableAnimation(new GameVector3(49, 9, 38))
    );
    /** 注册二号组装台动画 */
    this.addAnimation(
      AnimationConst.AssemblyTableAnimation2,
      new AssemblyTableAnimation(new GameVector3(49, 9, 37))
    );
    /** 注册三号组装台动画 */
    this.addAnimation(
      AnimationConst.AssemblyTableAnimation3,
      new AssemblyTableAnimation(new GameVector3(49, 9, 36))
    );
    /** 传递初始化 */
    this._animationMap.forEach((value) => {
      value.init();
    });
  }

  /** 添加动画实体 */
  public addAnimation(token: string, animation: BaseAnimationEntity): void {
    this._animationMap.set(token, animation);
  }

  /** 获取动画实体 */
  public getAnimation(token: string): BaseAnimationEntity | undefined {
    return this._animationMap.get(token);
  }

  /** 移除动画实体 */
  public removeAnimation(token: string): void {
    this._animationMap.delete(token);
  }

  public start(): void {}
  public update(delta: number): void {}
  public destory(): void {
    /** 传递销毁 */
    this._animationMap.forEach((value) => {
      value.destroy();
    });
  }
}
