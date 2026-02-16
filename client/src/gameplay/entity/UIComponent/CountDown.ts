import { BaseUIComponent } from './BaseUIComponent';

export class CountDown extends BaseUIComponent {
  private _countDown: UiText;
  public time: number = 0;
  constructor(countDown: UiText) {
    super();
    this._countDown = countDown;
  }
  public update(delta: number): void {
    this.time -= delta;
    this._countDown.textContent = Math.round(this.time / 1000).toString();
  }
}
