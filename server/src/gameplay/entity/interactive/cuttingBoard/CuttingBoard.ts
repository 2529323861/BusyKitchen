import type { IStateConfig } from '../../../../framework/common/StateMachine';
import { StateMachine } from '../../../../framework/common/StateMachine';
import { BaseInteractive } from '../BaseInteractive';
import { CuttingBoardState } from '../../../const/stateConst';
import { BoardIdleState } from './state/BoardIdleState';
import type {
  IConvertRecipe,
  IItemData,
} from '../../../jsonData/DataInterface';
import { NotStartedState } from './state/NotStartedState';
import { CuttingState } from './state/CuttingState';
import { CuttingFinishState } from './state/CuttingFinishState';
import type { CuttingBoardAnimation } from '../../AnimationEntity/CuttingBoardAnimation';
import { CommunicationConst } from '../../../../../../shares/communicationConst';
import type { IPlayerService } from '../../../service/interface/IPlayerService';
import { Container } from '../../../di/Container';
import { SERVICE_TOKENS } from '../../../di/tokens';
import type { IDataService } from '../../../service/interface/IDataService';
import type { IAnimationService } from '../../../service/interface/IAnimationService';
import type { ICommunicationService } from '../../../service/interface/ICommunicationService';

export class CuttingBoard extends BaseInteractive {
  /** 刀板暂存物 */
  public storageItem: IItemData | undefined;

  private _animationToken: string;

  /** 被点击的次数 */
  private _clickCount: number = 0;

  /** 最大点击次数 */
  private MAX_CLICK_COUNT = 3;

  /** 玩家服务 */
  private playerService: IPlayerService;

  /** 数据服务 */
  private dataService: IDataService;

  /** 动画服务 */
  private animationService: IAnimationService;

  /** 通讯服务 */
  private communicationService: ICommunicationService;

  constructor(entity: GameEntity, animationToken: string) {
    super(entity);
    this._animationToken = animationToken;
    /** 注入玩家数据依赖 */
    this.playerService = Container.instance.resolve<IPlayerService>(
      SERVICE_TOKENS.PLAYER_SERVICE
    );
    /** 注入数据服务 */
    this.dataService = Container.instance.resolve<IDataService>(
      SERVICE_TOKENS.DATA_SERVICE
    );
    /** 注入动画服务 */
    this.animationService = Container.instance.resolve<IAnimationService>(
      SERVICE_TOKENS.ANIMATION_SERVICE
    );
    /** 注入通讯服务 */
    this.communicationService =
      Container.instance.resolve<ICommunicationService>(
        SERVICE_TOKENS.COMMUNICATION_SERVICE
      );
  }
  public init(): void {
    this.storageItem = this.dataService.getDateFromItemMap('1000');
    this.interactRadius = 3;
    const stateConfig: IStateConfig = {
      initialState: CuttingBoardState.BoardIdleState,
      transitions: {
        /** 空闲状态 -> 未开始状态 */
        [CuttingBoardState.BoardIdleState]: {
          [CuttingBoardState.NotStartedState]: [],
        },
        /** 空闲状态 <- 未开始状态 -> 切菜状态 */
        [CuttingBoardState.NotStartedState]: {
          [CuttingBoardState.CuttingState]: [],
          [CuttingBoardState.BoardIdleState]: [],
        },
        /** 切菜状态 -> 完成状态 */
        [CuttingBoardState.CuttingState]: {
          [CuttingBoardState.CuttingFinishState]: [],
        },
        /** 完成状态 ->  */
        [CuttingBoardState.CuttingFinishState]: {
          [CuttingBoardState.BoardIdleState]: [],
        },
      },
    };
    this._stateMachine = new StateMachine(stateConfig);
    this._stateMachine.addState(new BoardIdleState(this));
    this._stateMachine.addState(new NotStartedState(this));
    this._stateMachine.addState(new CuttingState(this));
    this._stateMachine.addState(new CuttingFinishState(this));

    this._stateMachine.init();
    this.bindevent();
  }
  public bindevent(): void {
    this._entity.onInteract(({ entity }) => {
      this.interactCallBack(entity);
    });
  }

  /** 交互回调封装 */
  public interactCallBack(entity: GamePlayerEntity): void {
    /** 获取对应动画用实体 */
    const animation = this.animationService.getAnimation(
      this._animationToken
    ) as CuttingBoardAnimation;
    switch (this._stateMachine?.getCurrentStateName()) {
      case CuttingBoardState.BoardIdleState:
        {
          const playerItem = this.playerService.getPlayerSlot(
            entity.player.userId
          );
          if (this.dataService.searchCuttingTable(playerItem.id)) {
            /** 玩家手中的东西可以切 */
            /** 将玩家手中的东西放入刀板 */
            this.storageItem = playerItem;
            /** 将空放入玩家手中 */
            this.playerService.setPlayerSlot(
              entity.player.userId,
              this.dataService.getDateFromItemMap('1000')
            );
            /** 状态切换至未开始状态 */
            /** 更新动画 */
            animation.changeAnimation(this.storageItem.src);
            console.log('(server): 玩家用可交互物品交互闲置刀板');
            this._stateMachine!.transitionTo(CuttingBoardState.NotStartedState);
          } else {
            /** 玩家手中的东西不可以切 */
            console.log('(server): 玩家用不可交互物品交互闲置刀板');
            /** 留空做UI通知 */
            this.communicationService.popMessageToPlayer(
              entity.player.userId,
              `这个东西不能切`
            );
          }
        }
        break;
      case CuttingBoardState.NotStartedState:
        {
          const playerItem = this.playerService.getPlayerSlot(
            entity.player.userId
          );
          if (playerItem.id === '1000') {
            /** 玩家手中物品为空 */

            /** 将容器中物品取出 */
            this.playerService.setPlayerSlot(
              entity.player.userId,
              this.storageItem as IItemData
            );
            this.storageItem = this.dataService.getDateFromItemMap('1000');

            /** 更新动画 */
            animation.changeAnimation(this.storageItem.src);

            console.log('(server): 玩家将未开始刀板中物品取出');
            /** 切换状态为闲置状态 */
            this._stateMachine!.transitionTo(CuttingBoardState.BoardIdleState);
          } else {
            /** 玩家手中不为空，不可取出物品 */
            console.log('(server): 玩家无法取出未开始刀板');
            /** 预留UI接口 */
            this.communicationService.popMessageToPlayer(
              entity.player.userId,
              `手上放不下了`
            );
          }
        }
        break;
      case CuttingBoardState.CuttingState:
        this.communicationService.popMessageToPlayer(
          entity.player.userId,
          `加工中，请结束后再取出`
        );
        break;
      case CuttingBoardState.CuttingFinishState:
        {
          const playerItem = this.playerService.getPlayerSlot(
            entity.player.userId
          );
          if (playerItem.id === '1000') {
            /** 玩家手中物品为空 */

            const product = this.dataService.getDateFromItemMap(
              (
                this.dataService.searchCuttingTable(
                  (this.storageItem as IItemData).id
                ) as IConvertRecipe
              ).product
            );

            /** 将刀板中物品根据配方的合成产物取出 */
            this.playerService.setPlayerSlot(entity.player.userId, product);
            this.storageItem = this.dataService.getDateFromItemMap('1000');

            /** 更新动画 */
            animation.changeAnimation(this.storageItem.src);

            console.log('(server): 玩家将结束刀板中物品取出');
            /** 切换状态为闲置状态 */
            this._stateMachine!.transitionTo(CuttingBoardState.BoardIdleState);
          } else {
            /** 玩家手中不为空，不可取出物品 */
            console.log('(server): 玩家无法取出结束刀板');
            /** 预留UI接口 */
            this.communicationService.popMessageToPlayer(
              entity.player.userId,
              `手上放不下了`
            );
          }
        }
        break;
    }
  }

  /** 点击接口，用于处理点击事件 */
  public click(): void {
    /** 获取动画用实体 */
    const animation = this.animationService.getAnimation(
      this._animationToken
    ) as CuttingBoardAnimation;
    if (
      this._stateMachine?.getCurrentStateName() ===
      CuttingBoardState.NotStartedState
    ) {
      /** 如果刀板处于未开始状态 */
      /** 累计一次点击次数  */
      this._clickCount = 1;
      console.log('(server): 刀板点击并切换状态');
      console.log(`(server): 刀板点击次数: ${this._clickCount}`);
      /** 切换至切菜中状态 */
      this._stateMachine.transitionTo(CuttingBoardState.CuttingState);
    } else if (
      this._stateMachine?.getCurrentStateName() ===
      CuttingBoardState.CuttingState
    ) {
      /** 如果已经处于切菜中状态 */
      /** 累加一次点击次数次数 */
      this._clickCount++;
      console.log(`(server): 刀板点击次数: ${this._clickCount}`);
      if (this._clickCount >= this.MAX_CLICK_COUNT) {
        /** 如果点击次数达到最大点击次数 */
        /** 切换至切菜完成状态 */
        console.log('(server): 刀板点击次数达到，切换至完成状态');
        /** 更新动画 */
        const { product } = this.dataService.searchCuttingTable(
          (this.storageItem as IItemData).id
        )!;

        animation.changeAnimation(
          this.dataService.getDateFromItemMap(product).src
        );

        this._stateMachine.transitionTo(CuttingBoardState.CuttingFinishState);
      }
    }
  }
  public reset(): void {
    /** 清空容器 */
    this.storageItem = this.dataService.getDateFromItemMap('1000');
    /** 获取动画用实体 */
    const animation = this.animationService.getAnimation(
      this._animationToken
    ) as CuttingBoardAnimation;
    /** 更新动画 */
    animation.changeAnimation(this.storageItem.src);
    /** 切换状态为闲置状态 */
    this._stateMachine!.transitionTo(CuttingBoardState.BoardIdleState);
  }
}
