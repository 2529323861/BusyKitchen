import { CuttingBoardState } from '../../../../const/stateConst';
import { InteractiveBaseState } from '../../InteractiveBaseState';

export class CuttingFinishState extends InteractiveBaseState {
  public name: string = CuttingBoardState.CuttingFinishState;
  onInteract(player: GamePlayerEntity): void {}
}
