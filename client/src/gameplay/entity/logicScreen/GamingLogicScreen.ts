import { UiIndex_gaming } from '../../../../UiIndex/screens/UiIndex_gaming';
import { GamingLogicScreenComponentToken } from '../../const/UIComponentConst';
import { OrderList } from '../UIComponent/OrderList/OrderList';
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
    /** 注册订单列表 */
    this.addComponent(
      GamingLogicScreenComponentToken.OrderList,
      new OrderList(this._screen.uiBox_orderList)
    );

    super.init();
  }
  public start(): void {
    console.log('(client): GameLogicScreen start');
    super.start();
    /** 测试用模拟服务端调用 */
    const orderList = this.getComponent(
      GamingLogicScreenComponentToken.OrderList
    ) as OrderList;
    /** 测试添加逻辑 */
    setTimeout(() => {
      console.log('(client): 测试点1');
      orderList.addEntry({
        name: '营养汉堡',
        image: 'picture/burger_v3.png',
        maxTime: 60000,
        nowTime: 30000,
      });
      orderList.addEntry({
        name: '荤素汉堡',
        image: 'picture/burger_v2.png',
        maxTime: 60000,
        nowTime: 40000,
      });
      orderList.addEntry({
        name: '荤汉堡',
        image: 'picture/burger_v1.png',
        maxTime: 60000,
        nowTime: 50000,
      });
      orderList.addEntry({
        name: '牛肉汤',
        image: 'picture/beef_soup.png',
        maxTime: 60000,
        nowTime: 55000,
      });
    }, 1000);

    /** 测试删除逻辑 */
    setTimeout(() => {
      console.log('(client): 测试点2');
      orderList.removeEntry(1);
    }, 2000);

    /** 测试添加同时删除 */
    setTimeout(() => {
      console.log('(client): 测试点3');
      orderList.addEntry({
        name: '牛肉汤',
        image: 'picture/beef_soup.png',
        maxTime: 60000,
        nowTime: 55000,
      });
      orderList.addEntry({
        name: '牛肉汤',
        image: 'picture/beef_soup.png',
        maxTime: 60000,
        nowTime: 55000,
      });
      orderList.removeEntry(2);
    }, 3000);

    /** 测试同时删除多个 */
    setTimeout(() => {
      console.log('(client): 测试点4');
      orderList.removeEntry(1);
      orderList.removeEntry(1);
    }, 4000);
  }
  public update(delta: number): void {
    super.update(delta);
  }
  public destory(): void {
    super.destory();
  }
}
