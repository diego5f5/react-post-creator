import React from 'react';
import ReactDOM from 'react-dom';
import { PostProvider } from 'context/post';

import GlobalStyles from './globalStyles';

import CreatePost from './pages/CreatePost';

ReactDOM.render(
  <React.StrictMode>
    <PostProvider>
      <CreatePost />
      <GlobalStyles />
    </PostProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
