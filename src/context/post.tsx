import React, { createContext, useState, useContext, useRef } from 'react';

import { PostContextProps } from './models';

import { ItemsTypes, ItemIDTypes } from '../pages/CreatePost/models';

const PostContext = createContext<PostContextProps | undefined>(undefined);

const PostProvider: React.FC = ({ children }) => {
  const [selectedId, setSelectedId] = useState<ItemIDTypes>();
  const [isTyping, setIsTyping] = useState(false);
  const [items, setItems] = useState<Array<ItemsTypes>>([]);
  const [history, setHistory] = useState<Array<Array<ItemsTypes>>>([[]]);
  const [historyStep, setHistoryStep] = useState(0);

  const stageRef = useRef(null);

  const handleHistory = (itemsArray: Array<ItemsTypes>) => {
    let auxHistory = [...history];
    let auxHistoryStep = historyStep + 1;

    auxHistory = auxHistory.slice(0, auxHistoryStep);
    auxHistory.push(itemsArray);

    setHistory(auxHistory);
    setHistoryStep(auxHistoryStep);
  };

  return (
    <PostContext.Provider
      value={{
        selectedId,
        setSelectedId,
        isTyping,
        setIsTyping,
        items,
        setItems,
        history,
        setHistory,
        historyStep,
        setHistoryStep,
        handleHistory,
        stageRef,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePostProvider = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('usePostProvider must be used within an PostProvider.');
  }

  return context;
};

export { PostProvider, usePostProvider };
