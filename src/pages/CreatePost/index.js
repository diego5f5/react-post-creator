import React, { useState, useRef } from "react";
import { Stage, Layer } from "react-konva";

// Components
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Background from "./components/Background";
import ItemTransformer from "./components/ItemTransformer";

const initialHistory = [];

const CreatePost = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [items, setItems] = useState([]);

  const [history, setHistory] = useState([initialHistory]);
  const [historyStep, setHistoryStep] = useState(0);

  const stageRef = useRef(null);

  const handleDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleHistory = (itemsArray) => {
    let auxHistory = [...history];
    let auxHistoryStep = historyStep + 1;

    auxHistory = auxHistory.slice(0, auxHistoryStep);
    auxHistory.push(itemsArray);

    setHistory(auxHistory);
    setHistoryStep(auxHistoryStep);
  };

  const handleChange = (newAttrs, index) => {
    let oldItemArray = [...items];
    oldItemArray[index] = newAttrs;
    setItems(oldItemArray);

    handleHistory(oldItemArray);
  };

  const handleTextChange = (newAttrs, index) => {
    let oldItemArray = [...items];
    oldItemArray[index] = newAttrs;
    setItems(oldItemArray);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header stageRef={stageRef} setSelectedId={setSelectedId} />

      <div style={{ display: "flex" }}>
        <SideBar
          items={items}
          setItems={setItems}
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
          style={{ border: "solid 1px black" }}
          onMouseDown={handleDeselect}
          onTouchStart={handleDeselect}
        >
          <Background setSelectedId={setSelectedId} />
          <Layer>
            {items.map((item, index) => (
              <ItemTransformer
                key={index}
                itemProps={item}
                isSelected={item.id === selectedId}
                onSelect={() => setSelectedId(item.id)}
                onChange={(newAttrs) => handleChange(newAttrs, index)}
                onTextChange={(newAttrs) => handleTextChange(newAttrs, index)}
                stageRef={stageRef}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CreatePost;
