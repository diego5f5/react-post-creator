import React from "react";
import { Layer, Image } from "react-konva";
import useImage from "use-image";

// Images
import imgTeste from "../../../../assets/bg.png";

function Background({ setSelectedId }) {
  const [image] = useImage(imgTeste);

  return (
    <Layer>
      <Image
        image={image}
        x={0}
        y={0}
        width={600}
        height={600}
        onClick={() => setSelectedId(null)}
        onTap={() => setSelectedId(null)}
      />
    </Layer>
  );
}

export default Background;
