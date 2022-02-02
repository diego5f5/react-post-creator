import { useState, useRef, useEffect, RefObject } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';

import HeaderToolbar from './components/HeaderToolbar';
import Background from './components/Background';
import ItemTransformer from './components/ItemTransformer';

import { STAGE_VIRTUAL_SIZE, MIN_WIDTH } from './constants';

import { ItemsTypes, ItemIDTypes } from './models';

import { Container, BodySectionContainer } from './styles';

const CreatePost = () => {
  const [selectedId, setSelectedId] = useState<ItemIDTypes>();
  const [isTyping, setIsTyping] = useState(false);
  const [stageScale, setStageScale] = useState(0);
  const [items, setItems] = useState<Array<ItemsTypes>>([]);

  const [history, setHistory] = useState<Array<Array<ItemsTypes>>>([[]]);
  const [historyStep, setHistoryStep] = useState(0);

  const bodyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(null);

  useEffect(() => {
    handleWindowResize(bodyRef);

    window.addEventListener('resize', () => handleWindowResize(bodyRef));

    return () =>
      window.removeEventListener('resize', () => handleWindowResize(bodyRef));
  }, []);

  const handleWindowResize = (bodyRef: RefObject<HTMLDivElement>) => {
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

  const handleHistory = (itemsArray: Array<ItemsTypes>) => {
    let auxHistory = [...history];
    let auxHistoryStep = historyStep + 1;

    auxHistory = auxHistory.slice(0, auxHistoryStep);
    auxHistory.push(itemsArray);

    setHistory(auxHistory);
    setHistoryStep(auxHistoryStep);
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
        <HeaderToolbar
          width={STAGE_VIRTUAL_SIZE * stageScale}
          isTyping={isTyping}
          stageRef={stageRef}
          history={history}
          historyStep={historyStep}
          setHistoryStep={setHistoryStep}
          items={items}
          setItems={setItems}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          handleHistory={handleHistory}
        />

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
