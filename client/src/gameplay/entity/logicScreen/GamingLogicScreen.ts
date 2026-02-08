import { UiIndex_gaming } from '../../../../UiIndex/screens/UiIndex_gaming';
import { BaseLogicScreen } from './BaseLogicScreen';

export class GamingLogicScreen extends BaseLogicScreen {
  private _screen: UiIndex_gaming;
  constructor() {
    super();
    this._screen = new UiIndex_gaming(
      UiScreen.getAllScreen().filter((screen) => {
        return screen.name === 'gaming';
      })[0]
    );
  }
  public init(): void {
    console.log('(client): GameLogicScreen init');

    super.init();
  }
  public start(): void {
    console.log('(client): GameLogicScreen start');
    super.start();
  }
  public update(delta: number): void {
    super.update(delta);
  }
  public destory(): void {
    super.destory();
  }
}
