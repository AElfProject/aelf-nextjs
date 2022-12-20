export interface IInputParams {
  [key: string]: string;
}
export interface IMethod {
  name?: string;
  input?: string[];
  fn?: any;
}
export interface IParam {
  type: string;
  id: number;
}
export interface IField {
  [key: string]: IParam;
}
export interface IInputTypeInfo {
  fields: IField[];
}
