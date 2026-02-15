import { BaseUIComponent } from '../BaseUIComponent';
import { MessageEntry, MessageEntryState } from './MessageEntry';

export class MessageList extends BaseUIComponent {
  /** 绑定场景中的节点 */
  private messageList: UiNode;
  /** 消息显示队列 */
  private entryQueue: MessageEntry[] = [];

  private readonly maxTime: number = 5 * 1000;

  private entryTemplate: UiNode;

  constructor(messageList: UiNode) {
    super();
    this.messageList = messageList;
    this.entryTemplate = messageList.findChildByName(
      'entry_template'
    ) as UiNode;
  }

  /**
   * 添加一条新的消息到显示队列中
   * @param message 消息内容，是直接显示的，如果需要i18n请在调用之前
   */
  public popMessage(message: string) {
    /** 所有已有条目上移45像素 */
    this.entryQueue.forEach((value) => {
      value.moveUpward();
    });
    /** 创建新节点 */
    const newEntry = this.entryTemplate.clone();
    /** 更改新节点父节点 */
    newEntry.parent = this.messageList;
    /** 设置新节点可见新 */
    (newEntry as UiRenderable).visible = true;
    /** 设置新节点内容 */
    (newEntry.findChildByName('message') as UiText).textContent = message;
    this.entryQueue.push(new MessageEntry(newEntry));
  }

  public update(delta: number): void {
    this.entryQueue.forEach((value) => {
      value.update(delta);
    });
    /** 删除超时的信息 */
    while (
      this.entryQueue.length > 0 &&
      this.entryQueue[0].state === MessageEntryState.Destroied
    ) {
      this.entryQueue.shift();
    }
  }
}
