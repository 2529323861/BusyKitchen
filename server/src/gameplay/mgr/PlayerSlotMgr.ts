import { Singleton } from '../../framework/common/Singleton';
import type { IItemData } from '../entity/item/BaseItem';
import { JsonDataMgr } from './JsonDataMgr';
import { PlayerEntityMgr } from './PlayerEntityMgr';

export class PlayerSlotMgr extends Singleton<PlayerSlotMgr>() {
  private _playerSlotMap: Map<string, IItemData> = new Map();

  constructor() {
    super();
  }
  public init(): void {
    this.bindevent();
  }

  private bindevent(): void {
    /** 若玩家没有存储，则在加入游戏时为其分配初始存储 */
    world.onPlayerJoin(({ entity }) => {
      const { userId } = entity.player;
      if (this._playerSlotMap.has(userId)) {
        return;
      }
      this.initPlayerSlot(userId);
    });
  }

  /**
   * 初始化玩家手上的物品
   * @param userId 玩家id
   */
  public initPlayerSlot(userId: string): void {
    /** 初始化玩家手上的物品为空 */
    this.setPlayerSlot(userId, JsonDataMgr.instance.getDateFromItemMap('1000'));
  }

  /**
   * 获取玩家手上的物品
   * @param userId 玩家id
   * @returns 玩家手上的物品
   */
  public getPlayerSlot(userId: string): IItemData {
    /** 如果映射表中不存在这个玩家的数据 */
    if (!this._playerSlotMap.has(userId)) {
      /** 先初始化该玩家的存储单元 */
      this.initPlayerSlot(userId);
    }
    /** 返回这个玩家的数据 */
    return this._playerSlotMap.get(userId) as IItemData;
  }

  /**
   * 设置玩家手上的物品
   * @param userId 玩家id
   * @param item 物品数据
   */
  public setPlayerSlot(userId: string, item: IItemData): void {
    this._playerSlotMap.set(userId, item);
    console.log(
      `(server): 已将 ${item.name} 放入玩家 ${(PlayerEntityMgr.instance.getPlayerEntity(userId) as GamePlayerEntity).player.name} 的背包`
    );
    /** 这里预留逻辑用于更新UI */
  }

  /**
   * 清空所有玩家的存储单元
   */
  public clearAllPlayerSlot(): void {
    this._playerSlotMap = new Map();
  }

  public start(): void {}

  public update(delta: number): void {}

  public destory(): void {}
}
