import { MIN_WIDTH } from 'pages/CreatePost/constants';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  min-width: ${`${MIN_WIDTH}px`};
}

button {
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
}
`;
