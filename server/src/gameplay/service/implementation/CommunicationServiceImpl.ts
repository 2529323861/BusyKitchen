import type { ITransmitingMessage } from '../../../../../shares/communicationInterface';
import type { CommunicationMgr } from '../../mgr/CommunicationMgr';
import type { PlayerEntityMgr } from '../../mgr/PlayerEntityMgr';
import type { ICommunicationService } from '../interface/ICommunicationService';

export class CommunicationServiceImpl implements ICommunicationService {
  constructor(
    private communicationMgr: CommunicationMgr,
    private playerEntityMgr: PlayerEntityMgr
  ) {}
  sendTo(userId: string, data: ITransmitingMessage): void {
    if (this.playerEntityMgr.getPlayerEntity(userId)) {
      return this.communicationMgr.sendTo(
        this.playerEntityMgr.getPlayerEntity(userId) as GamePlayerEntity,
        data
      );
    }
  }
  sendBroad(data: ITransmitingMessage): void {
    this.communicationMgr.sendBroad(data);
  }
}
