import { ItemTypesEnum } from '../../models';

const defaultAnchors = {
  [ItemTypesEnum.TEXT]: ['middle-left', 'middle-right'],
  [ItemTypesEnum.IMAGE]: [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ],
};

export { defaultAnchors };
