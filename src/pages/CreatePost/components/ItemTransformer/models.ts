import { MutableRefObject } from 'react';
import { ItemsTypes } from '../../models';

export type ItemTransformerPropsTypes = {
  stageRef: MutableRefObject<null>;
  itemProps: ItemsTypes;
  isSelected: boolean;
  setIsTyping: (value: boolean) => void;
  onChange: (props: ItemsTypes, isTransformingText: boolean) => void;
  onSelect: () => void;
};
