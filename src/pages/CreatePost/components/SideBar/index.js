import React from "react";
import useImage from "use-image";

// Images
import imgTeste from "../../../../assets/test.png";

function SideBar({
  items,
  setItems,
  selectedId,
  setSelectedId,
  handleHistory,
  history,
  historyStep,
  setHistoryStep,
}) {
  const [image] = useImage(imgTeste);

  const handleAddSticker = () => {
    let newItemsArray = [...items];
    newItemsArray.push({
      x: 0,
      y: 0,
      width: 250,
      height: 250,
      rotation: 0,
      id: `sticker-${newItemsArray.length + 1}`,
      image: image,
      itemType: "image",
    });
    setItems(newItemsArray);

    handleHistory(newItemsArray);
  };

  const handleAddText = () => {
    let newItemsArray = [...items];
    newItemsArray.push({
      x: 50,
      y: 50,
      rotation: 0,
      text: "Text Example",
      id: `text-${newItemsArray.length + 1}`,
      itemType: "text",
      fontSize: 20,
    });
    setItems(newItemsArray);

    handleHistory(newItemsArray);
  };

  const handleRemoveItem = () => {
    if (selectedId) {
      let newItemsArray = [...items];
      newItemsArray.splice(
        items.findIndex((item) => {
          return item.id === selectedId;
        }),
        1
      );

      setItems(newItemsArray);
      setSelectedId(null);

      handleHistory(newItemsArray);
    }
  };

  const handleUndo = () => {
    if (historyStep === 0) {
      setItems([]);
      return;
    }

    const currentStep = historyStep - 1;
    setHistoryStep(currentStep);

    const previous = history[currentStep];
    setItems(previous);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }

    const currentStep = historyStep + 1;
    setHistoryStep(currentStep);

    const next = history[currentStep];
    setItems(next);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: 600,
        justifyContent: "space-evenly",
        marginRight: 20,
      }}
    >
      <button onClick={handleAddSticker}>Add Image</button>
      <button onClick={handleAddText}>Add Text</button>
      <div>
        <button style={{ marginRight: 10 }} onClick={handleUndo}>
          Undo
        </button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <button disabled={!selectedId} onClick={handleRemoveItem}>
        Remove
      </button>
    </div>
  );
}

export default SideBar;
