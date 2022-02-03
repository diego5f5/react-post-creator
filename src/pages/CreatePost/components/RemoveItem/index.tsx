import { Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { usePostProvider } from 'context/post';

const RemoveItem = () => {
  const {
    selectedId,
    setSelectedId,
    items,
    setItems,
    handleHistory,
    isTyping,
  } = usePostProvider();

  const handleRemoveItem = () => {
    if (selectedId) {
      let newItemsArray = [...items];
      newItemsArray.splice(
        items.findIndex((item) => {
          return item.id === selectedId;
        }),
        1
      );

      setItems(newItemsArray);
      setSelectedId(undefined);

      handleHistory(newItemsArray);
    }
  };

  return (
    <Tooltip title="Remove">
      <IconButton
        size="large"
        onClick={handleRemoveItem}
        disabled={isTyping || !selectedId ? true : false}
      >
        <Delete />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveItem;
