import { Download } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { usePostProvider } from 'context/post';

import { ButtonsContainer, SimpleWrapper } from '../../styles';

const PostDownload = () => {
  const { setSelectedId, stageRef } = usePostProvider();

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
    <ButtonsContainer>
      <Tooltip title="Download" arrow>
        <SimpleWrapper>
          <IconButton size="large" onClick={handleExport}>
            <Download />
          </IconButton>
        </SimpleWrapper>
      </Tooltip>
    </ButtonsContainer>
  );
};

export default PostDownload;
