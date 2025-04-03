import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

const Canvas = () => {
  return (
    <Stage width={window.innerWidth} height={400}>
      <Layer>
        <Text text="Hello, Konva.js!" fontSize={20} x={50} y={50} />
        <Rect
          x={100}
          y={100}
          width={100}
          height={100}
          fill="blue"
          draggable
        />
      </Layer>
    </Stage>
  );
};

export default Canvas;
