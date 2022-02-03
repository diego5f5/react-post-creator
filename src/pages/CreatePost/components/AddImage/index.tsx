import useImage from 'use-image';
import { AddPhotoAlternate } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import axios from 'axios';

import imgTest from 'assets/img.png';

import { STAGE_VIRTUAL_SIZE } from '../../constants';

import { usePostProvider } from 'context/post';

import { ItemTypesEnum } from '../../models';

const AddImage = () => {
  const [image] = useImage(imgTest);

  const { items, setItems, handleHistory } = usePostProvider();

  const handleAddImage = () => {
    const newItemsArray = [...items];

    newItemsArray.push({
      x: STAGE_VIRTUAL_SIZE / 2 - 125,
      y: STAGE_VIRTUAL_SIZE / 2 - 125,
      width: 250,
      height: 250,
      rotation: 0,
      id: `sticker-${newItemsArray.length + 1}`,
      image: image,
      itemType: ItemTypesEnum.IMAGE,
    });
    setItems(newItemsArray);

    handleHistory(newItemsArray);
  };

  const handleGetImages = () => {
    axios
      .get('/test')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <Tooltip title="Add Image">
      <IconButton size="large" onClick={handleAddImage}>
        <AddPhotoAlternate />
      </IconButton>
    </Tooltip>
  );
};

export default AddImage;
