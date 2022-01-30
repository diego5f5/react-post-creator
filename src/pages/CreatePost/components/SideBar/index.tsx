import useImage from 'use-image';

import imgTeste from 'assets/img.png';

import { SideBarPropsTypes } from './models';

function SideBar({
  items,
  setItems,
  selectedId,
  isTyping,
  setSelectedId,
  handleHistory,
  history,
  historyStep,
  setHistoryStep,
  stageRef,
}: SideBarPropsTypes) {
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
      itemType: 'image',
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
      text: 'Text Example',
      id: `text-${newItemsArray.length + 1}`,
      itemType: 'text',
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
      setSelectedId(undefined);

      handleHistory(newItemsArray);
    }
  };

  const handleUndo = () => {
    if (selectedId) {
      setSelectedId(undefined);
    }

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
    if (selectedId) {
      setSelectedId(undefined);
    }

    if (historyStep === history.length) {
      return;
    }

    const currentStep = historyStep + 1;
    setHistoryStep(currentStep);

    const next = history[currentStep];
    setItems(next);
  };

  const downloadURI = (uri: string, name: string) => {
    let link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    setSelectedId(undefined);

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const uri = stageRef?.current?.toDataURL({ pixelRatio: 4 });
      downloadURI(uri, 'post.png');
    }, 0);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 600,
        justifyContent: 'space-evenly',
        marginRight: 20,
      }}
    >
      <button onClick={handleAddSticker}>Add Image</button>
      <button onClick={handleAddText}>Add Text</button>
      <div>
        <button
          disabled={historyStep <= 0}
          style={{ marginRight: 10 }}
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          disabled={historyStep + 1 === history.length}
          onClick={handleRedo}
        >
          Redo
        </button>
      </div>
      <button
        disabled={isTyping || !selectedId ? true : false}
        onClick={handleRemoveItem}
      >
        Remove
      </button>
      <button onClick={handleExport}>Download</button>
    </div>
  );
}

export default SideBar;
