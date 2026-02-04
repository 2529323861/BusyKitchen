import { Singleton } from '../../framework/common/Singleton';
import { InteractiveConst } from '../const/interactiveConst';
import type { BaseInteractive } from '../entity/interactive/BaseInteractive';
import { CuttingBoard } from '../entity/interactive/cuttingBoard/CuttingBoard';
import { ItemSource } from '../entity/interactive/ItemSource';
import { JsonDataMgr } from './JsonDataMgr';

export class InteractiveMgr extends Singleton<InteractiveMgr>() {
  private _interactiveMap: Map<string, BaseInteractive> = new Map();

  constructor() {
    super();
  }
  public init(): void {
    /** 注册无限盘子源 */
    this.addInteractive(
      InteractiveConst.PlateSource,
      new ItemSource(
        world.querySelector('#interactionPoint_PLATE') as GameEntity,
        JsonDataMgr.instance.getDateFromItemMap('1001')
      )
    );
    /** 注册无限番茄源 */
    this.addInteractive(
      InteractiveConst.TomatoSource,
      new ItemSource(
        world.querySelector('#interactionPoint_TOMATO') as GameEntity,
        JsonDataMgr.instance.getDateFromItemMap('1008')
      )
    );
    /** 注册无限面包源 */
    this.addInteractive(
      InteractiveConst.BreadSource,
      new ItemSource(
        world.querySelector('#interactionPoint_BREAD') as GameEntity,
        JsonDataMgr.instance.getDateFromItemMap('1002')
      )
    );
    /** 注册无限生牛肉源 */
    this.addInteractive(
      InteractiveConst.BeefSource,
      new ItemSource(
        world.querySelector('#interactionPoint_BEEF') as GameEntity,
        JsonDataMgr.instance.getDateFromItemMap('1003')
      )
    );
    /** 注册无限生菜源 */
    this.addInteractive(
      InteractiveConst.LettuceSource,
      new ItemSource(
        world.querySelector('#interactionPoint_LETTUCE') as GameEntity,
        JsonDataMgr.instance.getDateFromItemMap('1006')
      )
    );
    /** 注册1号刀板 */
    this.addInteractive(
      InteractiveConst.CuttingBoard1,
      new CuttingBoard(
        world.querySelector('#interactionPoint_CUTTINGBOARD_1') as GameEntity
      )
    );
    /** 注册2号刀板 */
    this.addInteractive(
      InteractiveConst.CuttingBoard2,
      new CuttingBoard(
        world.querySelector('#interactionPoint_CUTTINGBOARD_2') as GameEntity
      )
    );
    /** 注册3号刀板 */
    this.addInteractive(
      InteractiveConst.CuttingBoard3,
      new CuttingBoard(
        world.querySelector('#interactionPoint_CUTTINGBOARD_3') as GameEntity
      )
    );
    /** 注册4号刀板 */
    this.addInteractive(
      InteractiveConst.CuttingBoard4,
      new CuttingBoard(
        world.querySelector('#interactionPoint_CUTTINGBOARD_4') as GameEntity
      )
    );
    /** 注册5号刀板 */
    this.addInteractive(
      InteractiveConst.CuttingBoard5,
      new CuttingBoard(
        world.querySelector('#interactionPoint_CUTTINGBOARD_5') as GameEntity
      )
    );

    /** 传递初始化 */
    this._interactiveMap.forEach((value) => {
      value.init();
    });
    this.bindevent();
  }

  private bindevent(): void {}

  /** 添加交互点 */
  public addInteractive(token: string, interactive: BaseInteractive): void {
    this._interactiveMap.set(token, interactive);
  }

  /** 获取交互点 */
  public getInteractive(token: string): BaseInteractive | undefined {
    return this._interactiveMap.get(token);
  }

  /** 移除交互点 */
  public removeInteractive(token: string): void {
    this._interactiveMap.delete(token);
  }

  /** 启用所有交互点 */
  public enableAllInteractive(): void {
    this._interactiveMap.forEach((value) => {
      value.enable();
    });
  }

  /** 禁用所有交互点 */
  public disableAllInteractive(): void {
    this._interactiveMap.forEach((value) => {
      value.disable();
    });
  }

  public start(): void {
    /** 传递启动 */
    this._interactiveMap.forEach((value) => {
      value.start();
    });
  }

  public update(delta: number) {
    /** 传递更新至所有交互点 */
    this._interactiveMap.forEach((value) => {
      value.update(delta);
    });
  }

  /** 传递销毁 */
  public destroy(): void {
    this._interactiveMap.forEach((value) => {
      value.destory();
    });
  }
}
