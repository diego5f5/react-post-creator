export enum ItemTypesEnum {
  IMAGE = 'IMAGE',
  TEXT = 'text',
}

export type ItemIDTypes = string | undefined;

export type ItemsTypes = {
  x: number;
  y: number;
  image?: HTMLImageElement;
  width?: number;
  height?: number;
  rotation?: number;
  id: ItemIDTypes;
  fontSize?: number;
  itemType: ItemTypesEnum;
  text?: string;
};
