/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { CircularProgress, Drawer, IconButton } from '@mui/material';
import { Add, Refresh, Close } from '@mui/icons-material';
import axios from 'axios';

import {
  DrawerHeader,
  DrawerBody,
  ImageContainer,
  ButtonsContainer,
  CustomFab,
} from './styles';

type ImagesDrawerProps = {
  setIsDrawerOpen: (value: boolean) => void;
  isDrawerOpen: boolean;
  handleAddImage: (value: string) => void;
};

const ImagesDrawer = ({
  setIsDrawerOpen,
  isDrawerOpen,
  handleAddImage,
}: ImagesDrawerProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    handleGetPokemon();
  }, []);

  const handleGetRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleGetPokemon = () => {
    setLoading(true);

    const randomInt = handleGetRandomInt(1, 500);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${randomInt}/`)
      .then((response) => {
        setImageUrl(response.data.sprites?.other?.home?.front_default || '');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      anchor={'right'}
    >
      <DrawerHeader>
        <IconButton
          color="default"
          size="large"
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        >
          <Close />
        </IconButton>
      </DrawerHeader>
      <DrawerBody>
        <ImageContainer src={imageUrl} alt="Pokemon Image" />

        <ButtonsContainer>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <CustomFab color="primary" onClick={() => handleGetPokemon()}>
                <Refresh />
              </CustomFab>
              <CustomFab
                color="primary"
                onClick={() => {
                  setIsDrawerOpen(false);
                  handleAddImage(imageUrl);
                }}
              >
                <Add />
              </CustomFab>
            </>
          )}
        </ButtonsContainer>
      </DrawerBody>
    </Drawer>
  );
};

export default ImagesDrawer;
