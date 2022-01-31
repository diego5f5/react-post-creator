import useImage from 'use-image';
import { Delete, AddOutlined } from '@mui/icons-material';

import imgTeste from 'assets/img.png';

import { SideBarPropsTypes } from './models';

import { Container, CustomButton } from './styles';

function SideBar({
  items,
  setItems,
  selectedId,
  isTyping,
  setSelectedId,
  handleHistory,
}: SideBarPropsTypes) {
  const [image] = useImage(imgTeste);

  const handleAddSticker = () => {
    let newItemsArray = [...items];
    newItemsArray.push({
      x: 0,
      y: 0,
      width: 250,
      height: 250,
      rotation: 0,
      id: `sticker-${newItemsArray.length + 1}`,
      image: image,
      itemType: 'image',
    });
    setItems(newItemsArray);

    handleHistory(newItemsArray);
  };

  const handleAddText = () => {
    let newItemsArray = [...items];
    newItemsArray.push({
      x: 50,
      y: 50,
      rotation: 0,
      text: 'Example Text',
      id: `text-${newItemsArray.length + 1}`,
      itemType: 'text',
      fontSize: 26,
    });
    setItems(newItemsArray);

    handleHistory(newItemsArray);
  };

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
    <Container>
      <CustomButton
        startIcon={<AddOutlined />}
        variant="contained"
        size="large"
        onClick={handleAddSticker}
      >
        Add Image
      </CustomButton>
      <CustomButton
        startIcon={<AddOutlined />}
        variant="contained"
        size="large"
        onClick={handleAddText}
      >
        Add Text
      </CustomButton>

      <CustomButton
        startIcon={<Delete />}
        variant="contained"
        size="large"
        disabled={isTyping || !selectedId ? true : false}
        onClick={handleRemoveItem}
      >
        Remove
      </CustomButton>
    </Container>
  );
}

export default SideBar;
