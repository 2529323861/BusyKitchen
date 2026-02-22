import { Stove } from './Stove';
import { FryStrategy } from './strategy/FryStrategy';

export class FryStove extends Stove {
  constructor(entity: GameEntity, stoveProgressAnimationToken: string) {
    super(entity, stoveProgressAnimationToken, new FryStrategy());
  }
}
