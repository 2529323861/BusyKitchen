import { Singleton } from '../../framework/common/Singleton';
import { ClickableConst } from '../const/clickableConst';
import { InteractiveConst } from '../const/interactiveConst';
import type { BaseClickable } from '../entity/clickable/BaseClickable';
import { CuttingBoardClicker } from '../entity/clickable/CuttingBoardClicker';
import type { CuttingBoard } from '../entity/interactive/cuttingBoard/CuttingBoard';
import { InteractiveMgr } from './InteractiveMgr';

export class ClickableMgr extends Singleton<ClickableMgr>() {
  private _clickableMap: Map<string, BaseClickable> = new Map();

  constructor() {
    super();
  }
  public init(): void {
    /** 注册刀板点击点1 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable1,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_1') as GameEntity,
        InteractiveMgr.instance.getInteractive(
          InteractiveConst.CuttingBoard1
        ) as CuttingBoard
      )
    );
    /** 注册刀板点击点2 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable2,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_2') as GameEntity,
        InteractiveMgr.instance.getInteractive(
          InteractiveConst.CuttingBoard2
        ) as CuttingBoard
      )
    );
    /** 注册刀板点击点3 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable3,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_3') as GameEntity,
        InteractiveMgr.instance.getInteractive(
          InteractiveConst.CuttingBoard3
        ) as CuttingBoard
      )
    );
    /** 注册刀板点击点4 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable4,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_4') as GameEntity,
        InteractiveMgr.instance.getInteractive(
          InteractiveConst.CuttingBoard4
        ) as CuttingBoard
      )
    );
    /** 注册刀板点击点5 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable5,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_5') as GameEntity,
        InteractiveMgr.instance.getInteractive(
          InteractiveConst.CuttingBoard5
        ) as CuttingBoard
      )
    );
    /** 传递初始化 */
    this._clickableMap.forEach((value) => {
      value.init();
    });
  }

  /** 添加点击点 */
  public addClickable(token: string, clickable: BaseClickable): void {
    this._clickableMap.set(token, clickable);
  }

  /** 获取点击点 */
  public getClickable(token: string): BaseClickable | undefined {
    return this._clickableMap.get(token);
  }

  /** 移除点击点 */
  public removeClickable(token: string): void {
    this._clickableMap.delete(token);
  }

  public start(): void {}
  public update(delta: number): void {}
  public destory(): void {}
}
