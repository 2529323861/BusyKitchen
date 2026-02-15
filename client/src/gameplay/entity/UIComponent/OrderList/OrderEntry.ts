import { BaseUIComponent } from '../BaseUIComponent';
import type { EntryConfig } from './OrderList';

export const enum EntryState {
  Normal = 'Normal',
  Deleting = 'Deleting',
  Destroyed = 'Destroyed',
}

export class OrderEntry extends BaseUIComponent {
  /** 绑定场景中的UI节点 */
  private _orderEntry: UiNode;

  private _destinationPos: Vec2;

  /** 用于控制删除时动画的简易状态机，仅字符串 */
  private _state: EntryState = EntryState.Normal;

  private maxTime: number;

  private nowTime: number;

  constructor(orderEntry: UiNode, index: number, config: EntryConfig) {
    super();
    this._orderEntry = orderEntry;
    this.maxTime = config.maxTime;
    this.nowTime = config.nowTime;
    (orderEntry as UiRenderable).visible = true;
    (orderEntry.findChildByName('time') as UiText).textContent = Math.round(
      config.nowTime / 1000
    ).toString();
    (orderEntry.findChildByName('icon') as UiImage).image = config.image;
    (orderEntry.findChildByName('name') as UiText).textContent = config.name;
    /** 设置初始位置 */
    (orderEntry as UiImage).position.offset.x = -200;
    (orderEntry as UiImage).position.offset.y = index * 50;
    this._destinationPos = Vec2.create({
      x: 0,
      y: index * 50,
    });
  }
  public init(): void {
    console.log('OrderEntry init');
  }
  public start(): void {
    console.log('OrderEntry start');
  }
  public update(delta: number): void {
    /** 如果未销毁 */
    if (this._state !== EntryState.Destroyed) {
      /** x使用非线性移动 */
      if (
        this._destinationPos.x !==
        (this._orderEntry as UiImage).position.offset.x
      ) {
        /** 非线性系数 */
        const factor = 0.5;
        /** 坐标不相等 */
        if (
          Math.abs(
            this._destinationPos.x -
              (this._orderEntry as UiImage).position.offset.x
          ) >= 1
        ) {
          /** 坐标差大于1 */
          (this._orderEntry as UiImage).position.offset.x +=
            (this._destinationPos.x -
              (this._orderEntry as UiImage).position.offset.x) *
            factor;
        } else {
          /** 坐标差较小，直接复位 */
          (this._orderEntry as UiImage).position.offset.x =
            this._destinationPos.x;
        }
      }
      /** y使用非线性移动 */
      if (
        this._destinationPos.y !==
        (this._orderEntry as UiImage).position.offset.y
      ) {
        /** 非线性系数 */
        const factor = 0.5;
        /** 坐标不相等 */
        if (
          Math.abs(
            this._destinationPos.y -
              (this._orderEntry as UiImage).position.offset.y
          ) >= 1
        ) {
          /** 坐标差大于1 */
          (this._orderEntry as UiImage).position.offset.y +=
            (this._destinationPos.y -
              (this._orderEntry as UiImage).position.offset.y) *
            factor;
        } else {
          /** 坐标差较小，直接复位 */
          (this._orderEntry as UiImage).position.offset.y =
            this._destinationPos.y;
        }
      }
      /** 维护剩余时间 */
      this.nowTime -= delta;
      (this._orderEntry.findChildByName('time') as UiText).textContent =
        Math.round(this.nowTime / 1000).toString();
      /** 维护进度条长度 */
      (
        this._orderEntry.findChildByName('orderbar_mask') as UiBox
      ).size.scale.y = this.nowTime / this.maxTime;

      /** 如果处于删除状态，则持续缩小高度 */
      if (this._state === EntryState.Deleting) {
        if (0 !== (this._orderEntry as UiImage).size.offset.y) {
          /** 非线性系数 */
          const factor = 0.5;
          /** 高度不相等 */
          if (Math.abs(0 - (this._orderEntry as UiImage).size.offset.y) >= 1) {
            /** 高度差大于1 */
            (this._orderEntry as UiImage).size.offset.y +=
              (0 - (this._orderEntry as UiImage).size.offset.y) * factor;
          } else {
            /** 高度差较小，直接复位 */
            (this._orderEntry as UiImage).size.offset.y = 0;
            this._state = EntryState.Destroyed;
            this.destroy();
          }
        }
      }
    }
  }
  /** 改变条目索引，用于设置条目的视觉位置 */
  public changeIndex(index: number): void {
    this._destinationPos.y = index * 50;
  }

  public delelete(): void {
    this._state = EntryState.Deleting;
    (this._orderEntry.findChildByName('time') as UiText).visible = false;
    (this._orderEntry.findChildByName('name') as UiText).visible = false;
  }
  get state() {
    return this._state;
  }

  public destroy(): void {
    this._orderEntry.parent = undefined;
  }
}
