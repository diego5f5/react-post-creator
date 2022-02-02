import React, { createContext, useState, useContext } from 'react';

const PostContext = createContext({});

const PostProvider: React.FC = ({ children }) => {
  const [test, setTest] = useState();

  return (
    <PostContext.Provider
      value={{
        test,
        setTest,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

function usePostProvider() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostProvider must be used within an PostProvider.');
  }

  return context;
}

export { PostProvider, usePostProvider };
