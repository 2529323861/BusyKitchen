import { BaseUIComponent } from '../BaseUIComponent';

export const enum MessageEntryState {
  /** 展示中 */
  Showing = 'Showing',
  /** 正常状态 */
  Normal = 'Normal',
  /** 删除中 */
  Deleting = 'Deleting',
  /** 已销毁 */
  Destroied = 'Destroied',
}

export class MessageEntry extends BaseUIComponent {
  /** 绑定场景中的节点 */
  private messageEntry: UiNode;

  /** 消失时间 */
  private readonly maxTime: number = 5 * 1000;

  /** 计时器 */
  private timer: number = 0;

  private _destinationPos: Vec2;

  private _state: MessageEntryState = MessageEntryState.Showing;

  constructor(messageEntry: UiNode) {
    super();
    this.messageEntry = messageEntry;
    (this.messageEntry as UiRenderable).size.offset.y = 0;
    this._destinationPos = Vec2.create({
      x: 0,
      y: 0,
    });
  }
  public update(delta: number): void {
    /** 使用非线性移动 */
    if (
      this._destinationPos.y !==
      (this.messageEntry as UiImage).position.offset.y
    ) {
      /** 非线性系数 */
      const factor = 0.5;
      /** 坐标不相等 */
      if (
        Math.abs(
          this._destinationPos.y -
            (this.messageEntry as UiImage).position.offset.y
        ) >= 1
      ) {
        /** 坐标差大于1 */
        (this.messageEntry as UiImage).position.offset.y +=
          (this._destinationPos.y -
            (this.messageEntry as UiImage).position.offset.y) *
          factor;
      } else {
        /** 坐标差较小，直接复位 */
        (this.messageEntry as UiImage).position.offset.y =
          this._destinationPos.y;
      }
    }
    /** 更新由状态决定的视觉效果 */
    if (this._state === MessageEntryState.Showing) {
      if (40 !== (this.messageEntry as UiImage).size.offset.y) {
        /** 非线性系数 */
        const factor = 0.5;
        /** 高度不相等 */
        if (Math.abs(40 - (this.messageEntry as UiImage).size.offset.y) >= 1) {
          /** 高度差大于1 */
          (this.messageEntry as UiImage).size.offset.y +=
            (40 - (this.messageEntry as UiImage).size.offset.y) * factor;
        } else {
          /** 高度差较小，直接复位 */
          (this.messageEntry as UiImage).size.offset.y = 40;
        }
      }
    } else if (this._state === MessageEntryState.Deleting) {
      if (0 !== (this.messageEntry as UiImage).size.offset.y) {
        /** 非线性系数 */
        const factor = 0.5;
        /** 高度不相等 */
        if (Math.abs(0 - (this.messageEntry as UiImage).size.offset.y) >= 1) {
          /** 高度差大于1 */
          (this.messageEntry as UiImage).size.offset.y +=
            (0 - (this.messageEntry as UiImage).size.offset.y) * factor;
        } else {
          /** 高度差较小，直接复位 */
          (this.messageEntry as UiImage).size.offset.y = 0;
          this._state = MessageEntryState.Destroied;
          this.destory();
        }
      }
    }
    /** 更新计时器 */
    this.timer += delta;
    if (this.timer > this.maxTime) {
      /** 由于操作是幂等的，所以不需要再判断是否调用过 */
      this.delete();
    }
  }

  public delete() {
    this._state = MessageEntryState.Deleting;
    (this.messageEntry.findChildByName('message') as UiText).textContent = '';
  }
  public moveUpward() {
    this._destinationPos.y -= 45;
  }
  get state() {
    return this._state;
  }
  public destory(): void {
    this.messageEntry.parent = undefined;
  }
}
