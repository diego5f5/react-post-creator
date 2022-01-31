import { Layer, Image } from 'react-konva';
import useImage from 'use-image';

import imgTeste from 'assets/bg.png';

import { STAGE_VIRTUAL_SIZE } from '../../constants';

import { BackgroundPropsTypes } from './models';

function Background({ setSelectedId }: BackgroundPropsTypes) {
  const [image] = useImage(imgTeste);

  const height = image?.height || 0;
  const scaleY = STAGE_VIRTUAL_SIZE / height;

  return (
    <Layer>
      <Image
        image={image}
        x={0}
        y={0}
        onClick={() => setSelectedId(undefined)}
        onTap={() => setSelectedId(undefined)}
        scale={{ x: scaleY, y: scaleY }}
      />
    </Layer>
  );
}

export default Background;
