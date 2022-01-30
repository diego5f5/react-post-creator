import { Layer, Image } from 'react-konva';
import useImage from 'use-image';

import { BackgroundPropsTypes } from './models';

import imgTeste from 'assets/bg.png';

function Background({ setSelectedId }: BackgroundPropsTypes) {
  const [image] = useImage(imgTeste);

  return (
    <Layer>
      <Image
        image={image}
        x={0}
        y={0}
        width={600}
        height={600}
        onClick={() => setSelectedId(undefined)}
        onTap={() => setSelectedId(undefined)}
      />
    </Layer>
  );
}

export default Background;
