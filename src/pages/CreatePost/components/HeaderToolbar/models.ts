import { MutableRefObject } from 'react';
import { ItemsTypes, ItemIDTypes } from '../../models';

export type HeaderToolbarPropsTypes = {
  setItems: (value: Array<ItemsTypes>) => void;
  selectedId: ItemIDTypes;
  setSelectedId: (value: ItemIDTypes) => void;
  history: Array<Array<ItemsTypes>>;
  historyStep: number;
  setHistoryStep: (value: number) => void;
  stageRef: MutableRefObject<null>;
  width: number;
  items: Array<ItemsTypes>;
  isTyping: boolean;
  handleHistory: (value: Array<ItemsTypes>) => void;
};
