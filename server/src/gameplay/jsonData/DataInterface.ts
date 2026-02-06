export interface IItemData {
  id: string;
  name: string;
  discription: string;
}
export interface ICuttingTableData {
  material: string;
  product: string;
}

export interface IBoilTableData {
  material: string;
  product: string;
}

export interface IFryTableData {
  material: string;
  product: string;
}

export interface IAssemblyFormulaData {
  material: Array<string>;
  product: string;
}
