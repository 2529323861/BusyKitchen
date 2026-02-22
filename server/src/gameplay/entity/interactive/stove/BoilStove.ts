import { Stove } from './Stove';
import { BoilStrategy } from './strategy/BoilStrategy';

export class BoilStove extends Stove {
  constructor(entity: GameEntity, stoveProgressAnimationToken: string) {
    super(entity, stoveProgressAnimationToken, new BoilStrategy());
  }
}
