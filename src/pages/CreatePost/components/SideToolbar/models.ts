import { ItemsTypes, ItemIDTypes } from '../../models';

export type SideBarPropsTypes = {
  items: Array<ItemsTypes>;
  setItems: (value: Array<ItemsTypes>) => void;
  isTyping: boolean;
  selectedId: ItemIDTypes;
  setSelectedId: (value: ItemIDTypes) => void;
  handleHistory: (value: Array<ItemsTypes>) => void;
};
