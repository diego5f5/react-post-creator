import styled from 'styled-components';
import { styled as MaterialStyled, IconButton } from '@mui/material';

import { HEADER_TOOLBAR_HEIGHT, TOP_MARGIN } from '../../constants';

export const Container = styled.div<{ width: number }>`
  margin-top: ${`${TOP_MARGIN}px`};
  height: ${`${HEADER_TOOLBAR_HEIGHT}px`};
  min-height: ${`${HEADER_TOOLBAR_HEIGHT}px`};
  display: flex;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 96px;
  justify-content: end;
`;

export const CustomIconButton = MaterialStyled(IconButton)(() => ({}));
