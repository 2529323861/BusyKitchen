import { Singleton } from '../../framework/common/Singleton';
import { ClickableConst } from '../const/clickableConst';
import { InteractiveConst } from '../const/interactiveConst';
import { AssemblyTableClicker } from '../entity/clickable/AssemblyTableClicker';
import type { BaseClickable } from '../entity/clickable/BaseClickable';
import { CuttingBoardClicker } from '../entity/clickable/CuttingBoardClicker';
import { DustbinClicker } from '../entity/clickable/DustbinClicker';
import { ItemSourceClicker } from '../entity/clickable/ItemSourceClicker';
import { StoveClicker } from '../entity/clickable/StoveClicker';
import type { AssemblyTable } from '../entity/interactive/AssemblyTable';
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
        InteractiveConst.CuttingBoard1
      )
    );
    /** 注册刀板点击点2 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable2,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_2') as GameEntity,
        InteractiveConst.CuttingBoard2
      )
    );
    /** 注册刀板点击点3 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable3,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_3') as GameEntity,
        InteractiveConst.CuttingBoard3
      )
    );
    /** 注册刀板点击点4 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable4,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_4') as GameEntity,
        InteractiveConst.CuttingBoard4
      )
    );
    /** 注册刀板点击点5 */
    this.addClickable(
      ClickableConst.CuttingBoardClickable5,
      new CuttingBoardClicker(
        world.querySelector('#clickPoint_CUTTINGBOARD_5') as GameEntity,
        InteractiveConst.CuttingBoard5
      )
    );
    /** 注册组装台点击点1 */
    this.addClickable(
      ClickableConst.AssemblyTableClicker1,
      new AssemblyTableClicker(
        world.querySelector('#clickPoint_ASSEMBLYTABLE_1') as GameEntity,
        InteractiveConst.AssemblyTable1
      )
    );
    /** 注册组装台点击点2 */
    this.addClickable(
      ClickableConst.AssemblyTableClicker2,
      new AssemblyTableClicker(
        world.querySelector('#clickPoint_ASSEMBLYTABLE_2') as GameEntity,
        InteractiveConst.AssemblyTable2
      )
    );
    /** 注册组装台点击点3 */
    this.addClickable(
      ClickableConst.AssemblyTableClicker3,
      new AssemblyTableClicker(
        world.querySelector('#clickPoint_ASSEMBLYTABLE_3') as GameEntity,
        InteractiveConst.AssemblyTable3
      )
    );
    /** 注册无限盘子源点击点 */
    this.addClickable(
      ClickableConst.PlateSource,
      new ItemSourceClicker(
        world.querySelector('#clickPoint_ITEMSOURCE_PLATE') as GameEntity,
        InteractiveConst.PlateSource
      )
    );
    /** 注册无限生菜源点击点 */
    this.addClickable(
      ClickableConst.LettuceSource,
      new ItemSourceClicker(
        world.querySelector('#clickPoint_ITEMSOURCE_LETTUCE') as GameEntity,
        InteractiveConst.LettuceSource
      )
    );
    /** 注册无限牛排源点击点 */
    this.addClickable(
      ClickableConst.BeefSource,
      new ItemSourceClicker(
        world.querySelector('#clickPoint_ITEMSOURCE_BEEF') as GameEntity,
        InteractiveConst.BeefSource
      )
    );
    /** 注册无限面包源点击点 */
    this.addClickable(
      ClickableConst.BreadSource,
      new ItemSourceClicker(
        world.querySelector('#clickPoint_ITEMSOURCE_BREAD') as GameEntity,
        InteractiveConst.BreadSource
      )
    );
    /** 注册无限番茄源点击点 */
    this.addClickable(
      ClickableConst.TomatoSource,
      new ItemSourceClicker(
        world.querySelector('#clickPoint_ITEMSOURCE_TOMATO') as GameEntity,
        InteractiveConst.TomatoSource
      )
    );
    /** 注册垃圾桶点击点 */
    this.addClickable(
      ClickableConst.Dustbin,
      new DustbinClicker(
        world.querySelector('#clickPoint_ITEMSOURCE_DUSTBIN') as GameEntity,
        InteractiveConst.Dustbin
      )
    );
    /** 注册灶台点击点1 */
    this.addClickable(
      ClickableConst.StoveClicker1,
      new StoveClicker(
        world.querySelector('#clickPoint_STOVE_1') as GameEntity,
        InteractiveConst.FryStove1
      )
    );
    /** 注册灶台点击点2 */
    this.addClickable(
      ClickableConst.StoveClicker2,
      new StoveClicker(
        world.querySelector('#clickPoint_STOVE_2') as GameEntity,
        InteractiveConst.FryStove2
      )
    );
    /** 注册灶台点击点3 */
    this.addClickable(
      ClickableConst.StoveClicker3,
      new StoveClicker(
        world.querySelector('#clickPoint_STOVE_3') as GameEntity,
        InteractiveConst.BoilStove1
      )
    );
    /** 注册灶台点击点4 */
    this.addClickable(
      ClickableConst.StoveClicker4,
      new StoveClicker(
        world.querySelector('#clickPoint_STOVE_4') as GameEntity,
        InteractiveConst.BoilStove2
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
  public destroy(): void {
    ClickableMgr.destroyInstance();
  }
}
