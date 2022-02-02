import {
  UndoOutlined,
  RedoOutlined,
  Download,
  TextFieldsOutlined,
  AddPhotoAlternateOutlined,
  Delete,
} from '@mui/icons-material';
import useImage from 'use-image';

import imgTestt from 'assets/img.png';

import { HeaderToolbarPropsTypes } from './models';
import { ItemTypesEnum } from '../../models';

import { Container, UndoRedoContainer, CustomIconButton } from './styles';

const HeaderToolbar = ({
  stageRef,
  history,
  historyStep,
  setHistoryStep,
  items,
  setItems,
  isTyping,
  selectedId,
  setSelectedId,
  handleHistory,
  width,
}: HeaderToolbarPropsTypes) => {
  const [image] = useImage(imgTestt);

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
      itemType: ItemTypesEnum.IMAGE,
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
      text: 'Example Text',
      id: `text-${newItemsArray.length + 1}`,
      itemType: ItemTypesEnum.TEXT,
      fontSize: 34,
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
    <Container width={width}>
      <UndoRedoContainer>
        <CustomIconButton
          disabled={historyStep <= 0}
          onClick={handleUndo}
          size="large"
        >
          <UndoOutlined />
        </CustomIconButton>
        <CustomIconButton
          disabled={historyStep + 1 === history.length}
          onClick={handleRedo}
          size="large"
        >
          <RedoOutlined />
        </CustomIconButton>
      </UndoRedoContainer>

      <CustomIconButton
        size="large"
        onClick={handleRemoveItem}
        disabled={isTyping || !selectedId ? true : false}
      >
        <Delete />
      </CustomIconButton>

      <CustomIconButton size="large" onClick={handleAddSticker}>
        <AddPhotoAlternateOutlined />
      </CustomIconButton>

      <CustomIconButton size="large" onClick={handleAddText}>
        <TextFieldsOutlined />
      </CustomIconButton>

      <CustomIconButton size="large" onClick={handleExport}>
        <Download />
      </CustomIconButton>
    </Container>
  );
};

export default HeaderToolbar;
