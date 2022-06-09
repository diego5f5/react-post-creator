import styled from 'styled-components';
import { styled as MaterialStyled, Button, Fab } from '@mui/material';

import {
  MOBILE_BREAKPOINT,
  DEFAULT_IMAGES_DRAWER_WIDTH,
} from '../../constants';

export const NavigateButton = MaterialStyled(Button)(() => ({
  height: '100%',
  width: '60px',
}));

export const CustomFab = MaterialStyled(Fab)(() => ({
  margin: '0 20px',
}));

export const ImageContainer = styled.img`
  height: 200px;
  width: 200px;
  filter: drop-shadow(5px 5px 8px gray);
`;

export const DrawerHeader = styled.div`
  padding: 20px 0 0 20px;
`;

export const DrawerBody = styled.div`
  width: 100vw;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${`(min-width: ${MOBILE_BREAKPOINT}px)`} {
    width: ${`${DEFAULT_IMAGES_DRAWER_WIDTH}px`};
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
