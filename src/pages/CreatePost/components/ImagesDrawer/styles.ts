import styled from 'styled-components';
import { styled as MaterialStyled, Drawer, Button } from '@mui/material';

import {
  MOBILE_BREAKPOINT,
  DEFAULT_IMAGES_DRAWER_WIDTH,
  MIN_WIDTH,
} from '../../constants';

export const Container = styled.div``;

export const CustomDrawer = MaterialStyled(Drawer)(() => ({
  // '& .MuiDrawer-paper': {
  //   alignSelf: 'center',
  //   backgroundColor: 'transparent',
  //   boxShadow: 'none',
  //   alignItems: 'center',
  // },
}));

export const NavigateButton = MaterialStyled(Button)(() => ({
  height: '100%',
  width: '60px',
}));

export const ImageContainer = styled.img`
  height: 110px;
  width: 110px;
  margin: 5px;

  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const DrawerHeader = styled.div`
  width: 100%;
  background-color: red;
`;

export const DrawerBody = styled.div`
  width: 100vw;
  height: auto;
  background-color: #ffffff;
  padding: 10px;
  min-width: ${`${MIN_WIDTH}px`};
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media ${`(min-width: ${MOBILE_BREAKPOINT}px)`} {
    width: ${`${DEFAULT_IMAGES_DRAWER_WIDTH}px`};
  }
`;

export const ContentContainer = styled.div`
  flex-wrap: wrap;
  width: fit-content;
`;
