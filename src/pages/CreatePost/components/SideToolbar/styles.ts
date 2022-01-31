import styled from 'styled-components';
import { styled as MaterialStyled, Button } from '@mui/material';

import { SIDE_TOOLBAR_WIDTH, HEADER_TOOLBAR_HEIGHT } from '../../constants';

export const Container = styled.div`
  width: ${`${SIDE_TOOLBAR_WIDTH}px`};
  min-width: ${`${SIDE_TOOLBAR_WIDTH}px`};
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: ${`${HEADER_TOOLBAR_HEIGHT}px`};
  padding-left: 20px;
  padding-right: 20px;
`;

export const CustomButton = MaterialStyled(Button)(() => ({
  marginBottom: '20px',
}));
