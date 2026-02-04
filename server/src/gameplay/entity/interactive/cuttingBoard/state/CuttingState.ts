import { CuttingBoardState } from '../../../../const/stateConst';
import { InteractiveBaseState } from '../../InteractiveBaseState';

export class CuttingState extends InteractiveBaseState {
  public name: string = CuttingBoardState.CuttingState;
  onInteract(player: GamePlayerEntity): void {}
}
