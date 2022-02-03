import { TextFieldsOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { STAGE_VIRTUAL_SIZE } from '../../constants';

import { usePostProvider } from 'context/post';

import { ItemTypesEnum } from '../../models';

const AddText = () => {
  const { items, setItems, handleHistory } = usePostProvider();

  const handleAddText = () => {
    const newItemsArray = [...items];
    const defaultWidth = 220;
    const defaultFontsize = 34;

    newItemsArray.push({
      x: STAGE_VIRTUAL_SIZE / 2 - defaultWidth / 2,
      y: STAGE_VIRTUAL_SIZE / 2 - defaultFontsize / 2,
      rotation: 0,
      width: defaultWidth,
      text: 'Example Text',
      id: `text-${newItemsArray.length + 1}`,
      itemType: ItemTypesEnum.TEXT,
      fontSize: defaultFontsize,
    });
    setItems(newItemsArray);

    handleHistory(newItemsArray);
  };

  return (
    <Tooltip title="Add Text">
      <IconButton size="large" onClick={handleAddText}>
        <TextFieldsOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default AddText;
