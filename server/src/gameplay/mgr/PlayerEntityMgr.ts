import { init } from 'i18next';
import { Singleton } from '../../framework/common/Singleton';
import { CommunicationMgr } from './CommunicationMgr';

export class PlayerEntityMgr extends Singleton<PlayerEntityMgr>() {
  private _playerEntityMap: Map<string, GamePlayerEntity> = new Map();

  constructor() {
    super();
  }
  public init(): void {
    this.bindevent();
  }

  private bindevent(): void {
    /** 当玩家加入游戏时，将其与其id建立映射关系 */
    world.onPlayerJoin(({ entity }) => {
      const { userId } = entity.player;
      this._playerEntityMap.set(userId, entity);
    });

    /** 当玩家退出游戏时，删除该映射 */
    world.onPlayerLeave(({ entity }) => {
      this._playerEntityMap.delete(entity.player.userId);
      CommunicationMgr.instance.removePlayInLiving(entity.player.userId);
    });
  }

  /**
   * 通过玩家id获取玩家实体，若玩家实体已经不存在于场景中则返回undefined
   * @param userId 玩家id
   * @returns 玩家实体
   */
  public getPlayerEntity(userId: string): GamePlayerEntity | undefined {
    return this._playerEntityMap.get(userId);
  }

  public start(): void {}

  public update(delta: number) {}

  public destroy() {
    PlayerEntityMgr.destroyInstance();
  }
  public hasPlayer(userId: string): boolean {
    return this._playerEntityMap.has(userId);
  }
}
