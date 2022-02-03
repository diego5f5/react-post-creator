import { useState, useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';

import Background from './components/Background';
import UndoRedo from './components/UndoRedo';
import RemoveItem from './components/RemoveItem';
import AddImage from './components/AddImage';
import AddText from './components/AddText';
import PostDownload from './components/PostDownload';
import ItemTransformer from './components/ItemTransformer';

import { STAGE_VIRTUAL_SIZE, MIN_WIDTH } from './constants';

import { usePostProvider } from 'context/post';

import { ItemsTypes } from './models';

import {
  Container,
  BodySectionContainer,
  HeaderSectionContainer,
} from './styles';

const CreatePost = () => {
  const [stageScale, setStageScale] = useState(0);
  const {
    items,
    setItems,
    selectedId,
    setSelectedId,
    setIsTyping,
    handleHistory,
    stageRef,
  } = usePostProvider();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleWindowResize = () => {
    if (bodyRef.current) {
      let width = bodyRef.current.offsetWidth;
      let height = bodyRef.current.offsetHeight;

      width = width <= MIN_WIDTH ? MIN_WIDTH : width;
      height = height <= MIN_WIDTH ? MIN_WIDTH : height;

      const maxSize = width < height ? width : height;

      const scale = maxSize / STAGE_VIRTUAL_SIZE;

      setStageScale(scale);
    }
  };

  const handleDeselect = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(undefined);
    }
  };

  const handleChange = (
    newAttrs: ItemsTypes,
    index: number,
    isTransformingText: boolean
  ) => {
    let oldItemArray = [...items];
    oldItemArray[index] = newAttrs;
    setItems(oldItemArray);

    if (isTransformingText) {
      return;
    }

    handleHistory(oldItemArray);
  };

  return (
    <Container>
      <BodySectionContainer ref={bodyRef}>
        <HeaderSectionContainer width={STAGE_VIRTUAL_SIZE * stageScale}>
          <UndoRedo />
          <RemoveItem />
          <AddImage />
          <AddText />
          <PostDownload />
        </HeaderSectionContainer>

        <Stage
          width={STAGE_VIRTUAL_SIZE * stageScale}
          height={STAGE_VIRTUAL_SIZE * stageScale}
          scaleX={stageScale}
          scaleY={stageScale}
          ref={stageRef}
          onMouseDown={handleDeselect}
          onTouchStart={handleDeselect}
        >
          <Background setSelectedId={setSelectedId} />
          <Layer>
            {items.map((item, index) => (
              <ItemTransformer
                key={index}
                itemProps={item}
                stageScale={stageScale}
                setIsTyping={setIsTyping}
                isSelected={item.id === selectedId}
                onSelect={() => setSelectedId(item.id)}
                onChange={(newAttrs: ItemsTypes, isTransformingText: boolean) =>
                  handleChange(newAttrs, index, isTransformingText)
                }
                stageRef={stageRef}
              />
            ))}
          </Layer>
        </Stage>
      </BodySectionContainer>
    </Container>
  );
};

export default CreatePost;
