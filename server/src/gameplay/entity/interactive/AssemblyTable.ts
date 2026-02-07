import type { IItemData } from '../../jsonData/DataInterface';
import { AnimationMgr } from '../../mgr/AnimationMgr';
import { JsonDataMgr } from '../../mgr/JsonDataMgr';
import { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import type { AssemblyTableAnimation } from '../AnimationEntity/AssemblyTableAnimation';
import { BaseInteractive } from './BaseInteractive';

export class AssemblyTable extends BaseInteractive {
  /** 物品栈 */
  private _itemStack: Array<IItemData> = [];
  /** 最大栈容量 */
  private STACK_CAPCITY = 5;
  /** 动画用实体绑定 */
  private _animationToken: string;

  constructor(entity: GameEntity, animationToken: string) {
    super(entity);
    this._animationToken = animationToken;
  }

  public init(): void {
    this._entity.interactRadius = 3;
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onInteract(({ entity }) => {
      /** 获取组装台动画用实体 */
      const animation = AnimationMgr.instance.getAnimation(
        this._animationToken
      ) as AssemblyTableAnimation;
      animation.start();
      if (
        PlayerSlotMgr.instance.getPlayerSlot(entity.player.userId).id === '1000'
      ) {
        /** 如果玩家手中物品为空 */
        if (this._itemStack.length > 0) {
          /** 栈中有物品 */
          /** 将栈顶物品弹出 */
          const item = this._itemStack.pop() as IItemData;
          /** 将物品放入玩家手中 */
          PlayerSlotMgr.instance.setPlayerSlot(entity.player.userId, item);
          console.log('(server): 玩家将组装台中物品取出');
          /** 更新动画 */
          animation.changeAnimation(this._itemStack);
        } else {
          /** 栈中无物品 */
          console.log('(server): 玩家空手交互空组装台');
          /** 预留做UI通知 */
        }
      } else {
        if (this._itemStack.length < this.STACK_CAPCITY) {
          /** 如果栈中还有空间 */
          /** 将玩家手中物品压入栈中 */
          this._itemStack.push(
            PlayerSlotMgr.instance.getPlayerSlot(entity.player.userId)
          );
          /** 更新动画 */
          animation.changeAnimation(this._itemStack);
          /** 清除玩家手上物品 */
          PlayerSlotMgr.instance.setPlayerSlot(
            entity.player.userId,
            JsonDataMgr.instance.getDateFromItemMap('1000')
          );
          console.log('(server): 已将玩家手中物品存入组装台');
        } else {
          /** 如果栈已满 */
          /** 预留做UI通知 */
          console.log('(server): 组装台栈已满');
        }
      }
    });
  }
  public assemble(): void {
    /** 获取组装台动画用实体 */
    const animation = AnimationMgr.instance.getAnimation(
      this._animationToken
    ) as AssemblyTableAnimation;

    console.log('(server): 玩家触发组装台合成');
    /** 构造检索用数组 */
    const materials: Array<string> = [];
    this._itemStack.forEach((value) => {
      materials.push(value.id);
    });
    /** 获取配方 */
    const formula = JsonDataMgr.instance.searchAssemblyFormula(materials);
    if (formula) {
      /** 配方存在 */
      /** 清空栈 */
      this._itemStack = [];
      /** 将合成产物压入栈中 */
      this._itemStack.push(
        JsonDataMgr.instance.getDateFromItemMap(formula.product)
      );
      /** 更新动画 */
      animation.changeAnimation(this._itemStack);
      console.log('(server): 玩家合成成功');
    } else {
      /** 配方不存在 */
      console.log('(server): 玩家合成失败，不存在的配方');
    }
  }
}
