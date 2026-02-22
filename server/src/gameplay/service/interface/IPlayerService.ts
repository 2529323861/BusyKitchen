import type { IItemData } from '../../jsonData/DataInterface';

export interface IPlayerService {
  getPlayerSlot(userId: string): IItemData;
  getPlayerEntity(userId: string): GamePlayerEntity | undefined;
  setPlayerSlot(userId: string, item: IItemData): void;
}
