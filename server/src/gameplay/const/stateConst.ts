/**
 * 控制游戏流程的状态机常量
 */
export const enum GameplayState {
  /** 游戏启动前的等待 */
  WaitingState = 'WaitingState',
  /** 游戏进行中  */
  PlayingState = 'PlayingState',
  /** 游戏结束时的结算 */
  GameOverState = 'GameOverState',
}

/**
 * 刀板的状态
 */
export const enum CuttingBoardState {
  /** 刀板闲置 */
  BoardIdleState = 'BoardIdleState',
  /** 刀板上有菜但是未开始加工 */
  NotStartedState = 'NotStartedState',
  /** 刀板上有菜且进行了部分加工 */
  CuttingState = 'CuttingState',
  /** 刀板上有菜且加工完毕 */
  CuttingFinishState = 'CuttingFinishState',
}

/**
 * 灶台的状态
 */
export const enum StoveState {
  /** 灶台闲置 */
  StoveIdleState = 'StoveIdleState',
  /** 灶台加工中 */
  CookingState = 'CookingState',
  /** 灶台加工完毕 */
  CookingFinishState = 'CookingFinishState',
  /** 灶台糊锅了 */
  BurntPotState = 'BurntPotState',
  /** 灶台清洁中 */
  CleaningState = 'CleaningState',
}
