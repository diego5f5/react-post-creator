import styled from 'styled-components';
import { styled as MaterialStyled, Button, IconButton } from '@mui/material';

import { HEADER_TOOLBAR_HEIGHT } from '../../constants';

export const Container = styled.div<{ width: number }>`
  height: ${`${HEADER_TOOLBAR_HEIGHT}px`};
  min-height: ${`${HEADER_TOOLBAR_HEIGHT}px`};
  display: flex;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UndoRedoContainer = styled.div`
  display: flex;
`;

export const CustomButton = MaterialStyled(Button)(() => ({
  width: 'fit-content',
}));

export const CustomIconButton = MaterialStyled(IconButton)(() => ({}));
