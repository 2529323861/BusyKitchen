import { init } from 'i18next';
import { StateMachine } from '../../framework/common/StateMachine';
import type { IStateConfig } from '../../framework/common/StateMachine';
import { GameplayState } from '../const/stateConst';
import { WaitingState } from './state/WaitingState';
import { PlayingState } from './state/PlayingState';
import { GameOverState } from './state/GameOverState';

export class MainLogic {
  private _stateMachine!: StateMachine | null;

  public init(): void {
    this.initState();
    this.bindevent();
  }

  public initState(): void {
    /** 规定游戏流程状态机 */
    const stateMachineConfig: IStateConfig = {
      initialState: GameplayState.WaitingState,
      transitions: {
        /** 等待状态能且仅能无条件转换至游戏中状态 */
        [GameplayState.WaitingState]: {
          [GameplayState.PlayingState]: [],
        },
        /** 游戏中状态能切仅能无条件转换至结算状态 */
        [GameplayState.PlayingState]: {
          [GameplayState.GameOverState]: [],
        },
        /** 结算状态能切仅能无条件转换至等待状态 */
        [GameplayState.GameOverState]: {
          [GameplayState.WaitingState]: [],
        },
      },
    };
    /** 创建状态机实例 */
    this._stateMachine = new StateMachine(stateMachineConfig);
    /** 向状态机添加状态  */
    this._stateMachine.addState(new WaitingState());
    this._stateMachine.addState(new PlayingState());
    this._stateMachine.addState(new GameOverState());
    /** 传递初始化至状态机 */
    this._stateMachine.init();
  }

  public bindevent(): void {}

  public start(): void {}

  public update(delta: number): void {
    /** 向状态机传递更新 */
    this._stateMachine!.update(delta);
  }

  public destory(): void {}
}
