import { useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';

import SideBar from './components/SideBar';
import Background from './components/Background';
import ItemTransformer from './components/ItemTransformer';

import { ItemsTypes, ItemIDTypes } from './models';

import { Container } from './styles';

const CreatePost = () => {
  const [selectedId, setSelectedId] = useState<ItemIDTypes>();
  const [isTyping, setIsTyping] = useState(false);
  const [items, setItems] = useState<Array<ItemsTypes>>([]);

  const [history, setHistory] = useState<Array<Array<ItemsTypes>>>([[]]);
  const [historyStep, setHistoryStep] = useState(0);

  const stageRef = useRef(null);

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
      <div style={{ display: 'flex' }}>
        <SideBar
          stageRef={stageRef}
          items={items}
          setItems={setItems}
          isTyping={isTyping}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          handleHistory={handleHistory}
          history={history}
          historyStep={historyStep}
          setHistoryStep={setHistoryStep}
        />

        <Stage
          width={600}
          height={600}
          ref={stageRef}
          style={{ border: 'solid 1px black' }}
          onMouseDown={handleDeselect}
          onTouchStart={handleDeselect}
        >
          <Background setSelectedId={setSelectedId} />
          <Layer>
            {items.map((item, index) => (
              <ItemTransformer
                key={index}
                itemProps={item}
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
      </div>
    </Container>
  );
};

export default CreatePost;
