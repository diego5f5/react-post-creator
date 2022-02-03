import { MutableRefObject } from 'react';
import { ItemsTypes, ItemIDTypes } from '../pages/CreatePost/models';

export type PostContextProps = {
  items: Array<ItemsTypes>;
  setItems: (value: Array<ItemsTypes>) => void;
  selectedId: ItemIDTypes;
  setSelectedId: (value: ItemIDTypes) => void;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
  history: Array<Array<ItemsTypes>>;
  setHistory: (value: Array<Array<ItemsTypes>>) => void;
  historyStep: number;
  setHistoryStep: (value: number) => void;
  handleHistory: (value: Array<ItemsTypes>) => void;
  stageRef: MutableRefObject<null>;
};
