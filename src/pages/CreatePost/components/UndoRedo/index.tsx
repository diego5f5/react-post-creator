import { UndoOutlined, RedoOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { usePostProvider } from 'context/post';

import { ButtonsContainer } from '../../styles';

const UndoRedo = () => {
  const {
    selectedId,
    setSelectedId,
    setItems,
    history,
    historyStep,
    setHistoryStep,
  } = usePostProvider();

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

  return (
    <ButtonsContainer>
      <Tooltip title="Undo">
        <IconButton
          disabled={historyStep <= 0}
          onClick={handleUndo}
          size="large"
        >
          <UndoOutlined />
        </IconButton>
      </Tooltip>

      <Tooltip title="Redo">
        <IconButton
          disabled={historyStep + 1 === history.length}
          onClick={handleRedo}
          size="large"
        >
          <RedoOutlined />
        </IconButton>
      </Tooltip>
    </ButtonsContainer>
  );
};

export default UndoRedo;
