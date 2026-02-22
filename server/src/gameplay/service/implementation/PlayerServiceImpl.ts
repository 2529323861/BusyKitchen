import { CommunicationConst } from '../../../../../shares/communicationConst';
import type { IItemData } from '../../jsonData/DataInterface';
import type { CommunicationMgr } from '../../mgr/CommunicationMgr';
import type { PlayerEntityMgr } from '../../mgr/PlayerEntityMgr';
import type { PlayerSlotMgr } from '../../mgr/PlayerSlotMgr';
import type { IPlayerService } from '../interface/IPlayerService';

export class PlayerServiceImpl implements IPlayerService {
  constructor(
    private playerSlotMgr: PlayerSlotMgr,
    private playerEntityMgr: PlayerEntityMgr,
    private communicationMgr: CommunicationMgr
  ) {}
  getPlayerSlot(userId: string): IItemData {
    return this.playerSlotMgr.getPlayerSlot(userId);
  }
  getPlayerEntity(userId: string): GamePlayerEntity | undefined {
    return this.playerEntityMgr.getPlayerEntity(userId);
  }
  setPlayerSlot(userId: string, item: IItemData): void {
    const playerEntity = this.getPlayerEntity(userId);
    if (playerEntity) {
      this.communicationMgr.sendTo(playerEntity, {
        token: CommunicationConst.UI_Screen_CommonScreen_MessageList_popMessage,
        payload: `已获得 ${item.name}`,
      });
      this.playerSlotMgr.setPlayerSlot(userId, item);
    }
  }
}
