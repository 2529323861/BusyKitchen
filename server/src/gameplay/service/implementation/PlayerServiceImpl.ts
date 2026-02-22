import type { IItemData } from '../../jsonData/DataInterface';
import type { PlayerEntityMgr } from '../../mgr/PlayerEntityMgr';
import type { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import type { IPlayerService } from '../interface/IPlayerService';

export class PlayerServiceImpl implements IPlayerService {
  constructor(
    private playerSlotMgr: PlayerSlotMgr,
    private playerEntityMgr: PlayerEntityMgr
  ) {}
  getPlayerSlot(userId: string): IItemData {
    return this.playerSlotMgr.getPlayerSlot(userId);
  }
  getPlayerEntity(userId: string): GamePlayerEntity | undefined {
    return this.playerEntityMgr.getPlayerEntity(userId);
  }
  setPlayerSlot(userId: string, item: IItemData): void {
    return this.playerSlotMgr.setPlayerSlot(userId, item);
  }
}
