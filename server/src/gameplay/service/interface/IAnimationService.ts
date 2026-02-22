import type { BaseAnimationEntity } from '../../entity/AnimationEntity/BaseAnimationEntity';

export interface IAnimationService {
  getAnimation(token: string): BaseAnimationEntity | undefined;
}
