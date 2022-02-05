/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

import {
  CustomDrawer,
  DrawerHeader,
  DrawerBody,
  ImageContainer,
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
  const [imageUrlArray, setImageUrlArray] = useState<string[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    handleGetPokemonList();
  }, []);

  const handleGetPokemonList = () => {
    setLoading(true);

    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${currentOffset}&limit=12`
      )
      .then((response) => {
        if (response.data && response.data.results) {
          const resultList = response.data.results;
          const auxImageUrlArray: string[] = [];

          Promise.all(
            resultList.map((pokemon: { name: string; url: string }) => {
              axios.get(pokemon.url).then((response) => {
                if (response.data) {
                  auxImageUrlArray.push(
                    response.data.sprites?.other?.home?.front_default || ''
                  );
                }
              });
            })
          )
            .catch(() => setLoading(false))
            .finally(() => {
              setLoading(false);
              setImageUrlArray(auxImageUrlArray);
            });
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <CustomDrawer
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      anchor={'right'}
    >
      <DrawerHeader></DrawerHeader>
      <DrawerBody>
        {loading ? <CircularProgress /> : null}

        {imageUrlArray.map((imgUrl, index) => (
          <ImageContainer
            key={`img-${index}`}
            src={imgUrl}
            alt="img"
            onClick={() => {
              setIsDrawerOpen(false);
              handleAddImage(imgUrl);
            }}
          />
        ))}
      </DrawerBody>
    </CustomDrawer>
  );
};

export default ImagesDrawer;
