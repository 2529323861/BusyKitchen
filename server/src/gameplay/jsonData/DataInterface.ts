export interface IItemData {
  id: string;
  name: string;
  discription: string;
  src: GameModelAssets;
  hight: number;
}

export interface IConvertRecipe {
  material: string;
  product: string;
}

export interface IAssemblyFormulaData {
  material: Array<string>;
  product: string;
}

export interface IOrdersData {
  id: string;
  item: string;
  name: string;
  img: string;
  time: number;
}
