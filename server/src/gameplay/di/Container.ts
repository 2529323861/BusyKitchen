/* eslint-disable @typescript-eslint/no-explicit-any */
import { Singleton } from '../../framework/common/Singleton';
import { AnimationMgr } from '../mgr/AnimationMgr';
import { CommunicationMgr } from '../mgr/CommunicationMgr';
import { JsonDataMgr } from '../mgr/JsonDataMgr';
import { PlayerEntityMgr } from '../mgr/PlayerEntityMgr';
import { PlayerSlotMgr } from '../mgr/PlayerSlotMgr';
import { AnimationServiceImpl } from '../service/implementation/AnimationServiceImpl';
import { CommunicationServiceImpl } from '../service/implementation/CommunicationServiceImpl';
import { DataServiceImpl } from '../service/implementation/DataServiceImpl';
import { PlayerServiceImpl } from '../service/implementation/PlayerServiceImpl';
import type { IAnimationService } from '../service/interface/IAnimationService';
import type { ICommunicationService } from '../service/interface/ICommunicationService';
import type { IDataService } from '../service/interface/IDataService';
import type { IPlayerService } from '../service/interface/IPlayerService';
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
      new PlayerServiceImpl(PlayerSlotMgr.instance, PlayerEntityMgr.instance)
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
        PlayerEntityMgr.instance
      )
    );
  }
}
