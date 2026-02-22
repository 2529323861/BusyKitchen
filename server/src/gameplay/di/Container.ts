/* eslint-disable @typescript-eslint/no-explicit-any */
import { Singleton } from '../../framework/common/Singleton';
import { AnimationMgr } from '../mgr/AnimationMgr';
import { CommunicationMgr } from '../mgr/CommunicationMgr';
import { JsonDataMgr } from '../mgr/JsonDataMgr';
import { OrderMgr } from '../mgr/OrderMgr';
import { PlayerEntityMgr } from '../mgr/PlayerEntityMgr';
import { PlayerSlotMgr } from '../mgr/PlayerSlotMgr';
import { ScoreMgr } from '../mgr/ScoreMgr';
import { AnimationServiceImpl } from '../service/implementation/AnimationServiceImpl';
import { CommunicationServiceImpl } from '../service/implementation/CommunicationServiceImpl';
import { DataServiceImpl } from '../service/implementation/DataServiceImpl';
import { OrderServieImpl } from '../service/implementation/OrderServiceImpl';
import { PlayerServiceImpl } from '../service/implementation/PlayerServiceImpl';
import { ScoreServiceImpl } from '../service/implementation/ScoreServiceImpl';
import type { IAnimationService } from '../service/interface/IAnimationService';
import type { ICommunicationService } from '../service/interface/ICommunicationService';
import type { IDataService } from '../service/interface/IDataService';
import type { IOrderService } from '../service/interface/IOrderService';
import type { IPlayerService } from '../service/interface/IPlayerService';
import type { IScoreService } from '../service/interface/IScoreService';
import { SERVICE_TOKENS } from './tokens';

export class Container extends Singleton<Container>() {
  private services: Map<string, any> = new Map();

  constructor() {
    super();
    this.registerAllService();
  }
  public register<T>(token: string, service: T): void {
    this.services.set(token, service);
  }
  public resolve<T>(token: string): T {
    const service = this.services.get(token);
    if (!service) {
      throw new Error(`Service ${token} not found`);
    }
    return service;
  }
  private registerAllService() {
    /** 注册玩家相关依赖 */
    this.register<IPlayerService>(
      SERVICE_TOKENS.PLAYER_SERVICE,
      new PlayerServiceImpl(
        PlayerSlotMgr.instance,
        PlayerEntityMgr.instance,
        CommunicationMgr.instance
      )
    );
    /** 注册数据相关依赖 */
    this.register<IDataService>(
      SERVICE_TOKENS.DATA_SERVICE,
      new DataServiceImpl(JsonDataMgr.instance)
    );
    /** 注册动画相关依赖 */
    this.register<IAnimationService>(
      SERVICE_TOKENS.ANIMATION_SERVICE,
      new AnimationServiceImpl(AnimationMgr.instance)
    );
    /** 注册通讯相关依赖 */
    this.register<ICommunicationService>(
      SERVICE_TOKENS.COMMUNICATION_SERVICE,
      new CommunicationServiceImpl(
        CommunicationMgr.instance,
        PlayerEntityMgr.instance,
        ScoreMgr.instance
      )
    );
    /** 注册得分相关依赖 */
    this.register<IScoreService>(
      SERVICE_TOKENS.SCORE_SERVICE,
      new ScoreServiceImpl(ScoreMgr.instance)
    );
    /** 注册订单相关依赖 */
    this.register<IOrderService>(
      SERVICE_TOKENS.ORDER_SERVICE,
      new OrderServieImpl(OrderMgr.instance)
    );
  }
}
