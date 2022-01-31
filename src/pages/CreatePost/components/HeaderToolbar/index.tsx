import { UndoOutlined, RedoOutlined, Download } from '@mui/icons-material';

import { HeaderToolbarPropsTypes } from './models';

import {
  Container,
  UndoRedoContainer,
  CustomButton,
  CustomIconButton,
} from './styles';

const HeaderToolbar = ({
  stageRef,
  history,
  historyStep,
  setHistoryStep,
  setItems,
  selectedId,
  setSelectedId,
  width,
}: HeaderToolbarPropsTypes) => {
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
      <CustomButton
        startIcon={<Download />}
        variant="contained"
        onClick={handleExport}
        size="large"
      >
        Download
      </CustomButton>
    </Container>
  );
};

export default HeaderToolbar;
