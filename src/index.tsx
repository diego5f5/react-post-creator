import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './globalStyles';

import CreatePost from './pages/CreatePost';

ReactDOM.render(
  <React.StrictMode>
    <CreatePost />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById('root')
);
