import styled from 'styled-components';

import { HEADER_TOOLBAR_HEIGHT, BOTTOM_MARGIN, TOP_MARGIN } from './constants';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

export const SimpleWrapper = styled.span``;

export const HeaderSectionContainer = styled.div<{ width: number }>`
  margin-top: ${`${TOP_MARGIN}px`};
  height: ${`${HEADER_TOOLBAR_HEIGHT}px`};
  min-height: ${`${HEADER_TOOLBAR_HEIGHT}px`};
  display: flex;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BodySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${`calc(100vh - ${
    HEADER_TOOLBAR_HEIGHT + BOTTOM_MARGIN + TOP_MARGIN
  }px)`};
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 96px;
  justify-content: end;
`;
