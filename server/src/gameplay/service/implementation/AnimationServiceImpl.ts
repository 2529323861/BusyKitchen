import type { BaseAnimationEntity } from '../../entity/AnimationEntity/BaseAnimationEntity';
import type { AnimationMgr } from '../../mgr/AnimationMgr';
import type { IAnimationService } from '../interface/IAnimationService';

export class AnimationServiceImpl implements IAnimationService {
  constructor(private animationMgr: AnimationMgr) {}
  getAnimation(token: string): BaseAnimationEntity | undefined {
    return this.animationMgr.getAnimation(token);
  }
}
