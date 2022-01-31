import styled from 'styled-components';

import {
  HEADER_TOOLBAR_HEIGHT,
  SIDE_TOOLBAR_WIDTH,
  BODY_MARGIN,
} from './constants';

export const Container = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
`;

export const BodySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${`calc(100% - ${SIDE_TOOLBAR_WIDTH + BODY_MARGIN}px)`};
  height: ${`calc(100vh - ${HEADER_TOOLBAR_HEIGHT + BODY_MARGIN}px)`};
`;
