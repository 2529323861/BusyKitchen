import {
  StateMachine,
  type IStateConfig,
} from '../../../../framework/common/StateMachine';
import { StoveState } from '../../../const/stateConst';
import { Container } from '../../../di/Container';
import { SERVICE_TOKENS } from '../../../di/tokens';
import type {
  IConvertRecipe,
  IItemData,
} from '../../../jsonData/DataInterface';
import type { ICommunicationService } from '../../../service/interface/ICommunicationService';
import type { IDataService } from '../../../service/interface/IDataService';
import type { IPlayerService } from '../../../service/interface/IPlayerService';
import { BaseInteractive } from '../BaseInteractive';
import { BurntPotState } from './state/BurntPotState';
import { CleaningState } from './state/CleaningState';
import { CookingFinishState } from './state/CookingFinishState';
import { CookingState } from './state/CookingState';
import { StoveIdleState } from './state/StoveIdleState';
import type { IStoveStrategyg } from './strategy/IStoveStrategy';

export class Stove extends BaseInteractive {
  public readonly _stoveProgressAnimationToken: string;

  protected storageItem: IItemData;

  /** 策略 */
  protected stoveStrategy: IStoveStrategyg;

  /** 数据服务 */
  protected dataService: IDataService;

  /** 玩家服务 */
  protected playerService: IPlayerService;

  /** 通讯服务 */
  protected communicationService: ICommunicationService;

  constructor(
    entity: GameEntity,
    stoveProgressAnimationToken: string,
    stoveStrategy: IStoveStrategyg
  ) {
    super(entity);
    this._stoveProgressAnimationToken = stoveProgressAnimationToken;

    /** 绑定策略 */
    this.stoveStrategy = stoveStrategy;

    /** 注入玩家依赖 */
    this.playerService = Container.instance.resolve<IPlayerService>(
      SERVICE_TOKENS.PLAYER_SERVICE
    );

    /** 注入数据依赖 */
    this.dataService = Container.instance.resolve<IDataService>(
      SERVICE_TOKENS.DATA_SERVICE
    );

    /** 注入通讯依赖 */
    this.communicationService =
      Container.instance.resolve<ICommunicationService>(
        SERVICE_TOKENS.COMMUNICATION_SERVICE
      );

    this.storageItem = this.dataService.getDateFromItemMap('1000');
  }

  public init(): void {
    this.interactRadius = 3;
    const stateConfig: IStateConfig = {
      initialState: StoveState.StoveIdleState,
      transitions: {
        /** 闲置状态 -> 烹饪状态 */
        [StoveState.StoveIdleState]: {
          [StoveState.CookingState]: [],
        },
        /** 烹饪状态 -> 完成状态 */
        [StoveState.CookingState]: {
          [StoveState.CookingFinishState]: [],
        },
        /** 完成状态 -> 烧焦状态 或 闲置状态 */
        [StoveState.CookingFinishState]: {
          [StoveState.BurntPotState]: [],
          [StoveState.StoveIdleState]: [],
        },
        /** 烧焦状态 -> 清洁状态 */
        [StoveState.BurntPotState]: {
          [StoveState.CleaningState]: [],
        },
        /** 清洁状态 -> 闲置状态 */
        [StoveState.CleaningState]: {
          [StoveState.StoveIdleState]: [],
        },
      },
    };
    this._stateMachine = new StateMachine(stateConfig);
    this._stateMachine.addState(new StoveIdleState(this));
    this._stateMachine.addState(new CookingState(this));
    this._stateMachine.addState(new CookingFinishState(this));
    this._stateMachine.addState(new BurntPotState(this));
    this._stateMachine.addState(new CleaningState(this));

    this._stateMachine.init();
    this.bindevent();
  }
  public update(delta: number): void {
    this._stateMachine?.update(delta);
  }
  public reset(): void {
    /** 清空容器 */
    this.storageItem = this.dataService.getDateFromItemMap('1000');
    /** 状态机切换为闲置状态 */
    this._stateMachine?.transitionTo(StoveState.StoveIdleState);
  }

  public bindevent(): void {
    this._entity.onInteract(({ entity }) => {
      this.interactCallback(entity);
    });
  }
  /** 交互回调封装 */
  public interactCallback(entity: GamePlayerEntity): void {
    const state = this._stateMachine?.getCurrentStateName();
    switch (state) {
      case StoveState.StoveIdleState: {
        /** 交互时炉子处于空闲状态 */
        const playerItem = this.playerService.getPlayerSlot(
          entity.player.userId
        );
        if (this.stoveStrategy.searchRecipe(playerItem.id)) {
          /** 玩家手中的东西可以煎 */
          /** 将玩家手中的东西放入炉子中 */
          this.storageItem = playerItem;
          /** 将空放入玩家手中 */
          this.playerService.setPlayerSlot(
            entity.player.userId,
            this.dataService.getDateFromItemMap('1000')
          );
          /** 状态切换煎炸中 */
          /** 发送客户端提示 */
          this.communicationService.popMessageToPlayer(
            entity.player.userId,
            `已启动${this.stoveStrategy.stoveTypeName}`
          );
          console.log('(server): 玩家用可交互物品交互闲置锅炉');
          this._stateMachine!.transitionTo(StoveState.CookingState);
        } else {
          /** 发送客户端提示 */
          this.communicationService.popMessageToPlayer(
            entity.player.userId,
            `这东西不能${this.stoveStrategy.cookingVerb}吧`
          );
          /** 玩家手中的东西不可以煎炸 */
          console.log('(server): 玩家用不可交互物品交互闲置煎锅板');
        }
        break;
      }
      case StoveState.CookingFinishState: {
        /** 交互时炉子处于完成状态 */
        const playerItem = this.playerService.getPlayerSlot(
          entity.player.userId
        );
        if (playerItem.id === '1001') {
          /** 玩家手中物品为盘子 */

          const product = this.dataService.getDateFromItemMap(
            (
              this.stoveStrategy.searchRecipe(
                this.storageItem.id
              ) as IConvertRecipe
            ).product
          );

          /** 将煎锅中物品根据配方的合成产物取出 */
          this.playerService.setPlayerSlot(entity.player.userId, product);
          this.storageItem = this.dataService.getDateFromItemMap('1000');

          console.log('(server): 玩家将结束灶台中的产物取出');
          /** 切换状态为闲置状态 */
          this._stateMachine!.transitionTo(StoveState.StoveIdleState);
        } else {
          /** 玩家手中不为空，不可取出物品 */
          console.log('(server): 玩家无法取出结束灶台中的物品');
          /** 预留UI接口 */
          this.communicationService.popMessageToPlayer(
            entity.player.userId,
            `需要盘子才能取出产物`
          );
        }
        break;
      }
      case StoveState.BurntPotState: {
        /** 交互时炉子处于烧焦状态 */
        const playerItem = this.playerService.getPlayerSlot(
          entity.player.userId
        );
        if (playerItem.id === '1001') {
          /** 玩家手中物品为盘子 */

          /** 给予玩家锅灰 */
          this.playerService.setPlayerSlot(
            entity.player.userId,
            this.dataService.getDateFromItemMap('1014')
          );
          this.storageItem = this.dataService.getDateFromItemMap('1000');
          console.log('(server): 玩家将锅灰从烧糊灶台中取出');
          this._stateMachine!.transitionTo(StoveState.CleaningState);
        } else {
          /** 玩家手中不为空，不可取出物品 */
          console.log('(server): 玩家无法取出烧糊灶台');
          /** 预留UI接口 */
          this.communicationService.popMessageToPlayer(
            entity.player.userId,
            `需要盘子才能取出产物`
          );
        }
        break;
      }
      default: {
        this.communicationService.popMessageToPlayer(
          entity.player.userId,
          `${this.stoveStrategy.stoveTypeName}繁忙中，请稍后`
        );
        break;
      }
    }
  }
}
