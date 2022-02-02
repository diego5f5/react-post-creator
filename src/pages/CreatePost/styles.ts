import styled from 'styled-components';

import { HEADER_TOOLBAR_HEIGHT, BOTOOM_MARGIN, TOP_MARGIN } from './constants';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

export const BodySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${`calc(100vh - ${
    HEADER_TOOLBAR_HEIGHT + BOTOOM_MARGIN + TOP_MARGIN
  }px)`};
  align-items: center;
`;
