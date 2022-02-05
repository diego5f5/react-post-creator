import { useState } from 'react';
import { AddPhotoAlternate } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { usePostProvider } from 'context/post';

import { STAGE_VIRTUAL_SIZE } from '../../constants';

import ImagesDrawer from '../ImagesDrawer';

import { ItemTypesEnum } from '../../models';

import { SimpleWrapper } from '../../styles';

const AddImage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { items, setItems, handleHistory } = usePostProvider();

  const handleAddImage = (imageUrl: string) => {
    const newItemsArray = [...items];

    const defaultImageSize = 250;

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageUrl);
    imageElement.setAttribute('crossOrigin', 'anonymous');

    newItemsArray.push({
      x: STAGE_VIRTUAL_SIZE / 2 - defaultImageSize / 2,
      y: STAGE_VIRTUAL_SIZE / 2 - defaultImageSize / 2,
      width: defaultImageSize,
      height: defaultImageSize,
      rotation: 0,
      id: `sticker-${newItemsArray.length + 1}`,
      image: imageElement,
      itemType: ItemTypesEnum.IMAGE,
    });
    setItems(newItemsArray);

    handleHistory(newItemsArray);
  };

  return (
    <>
      <ImagesDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleAddImage={(imageUrl) => handleAddImage(imageUrl)}
      />

      <Tooltip title="Add Image" arrow>
        <SimpleWrapper>
          <IconButton size="large" onClick={() => setIsDrawerOpen(true)}>
            <AddPhotoAlternate />
          </IconButton>
        </SimpleWrapper>
      </Tooltip>
    </>
  );
};

export default AddImage;
