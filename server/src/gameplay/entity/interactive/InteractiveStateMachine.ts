import { StateMachine } from '../../../framework/common/StateMachine';
import type { InteractiveBaseState } from './InteractiveBaseState';

export class InteractiveStateMachine extends StateMachine {
  public interact(entity: GamePlayerEntity): void {
    (this.currentState as InteractiveBaseState)?.onInteract(entity);
    this.checkTransitions();
  }
}
