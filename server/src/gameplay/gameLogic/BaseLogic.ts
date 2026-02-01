import type { StateMachine } from '../../framework/common/StateMachine';

interface IBaseLogic {
  stateMachine: StateMachine | null;
  init(): void;
  start(): void;
  update(deltaTime: number): void;
  destroy(): void;
}

export class BaseLogic implements IBaseLogic {
  public stateMachine: StateMachine | null = null;
  init(): void {}
  start(): void {}
  update(deltaTime: number): void {}
  destroy(): void {}
}
