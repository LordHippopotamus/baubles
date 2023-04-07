import { Box } from '@mui/material';
import { useState } from 'react';
import Canvas from './Canvas';

const Preview = ({ area }) => {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleScale = event => {
    const delta = event.wheelDelta ? event.wheelDelta : -event.deltaY;
    const nextScale = delta > 0 ? scale * 1.2 : scale * 0.8;
    setTranslate({
      x: (nextScale / scale) * (translate.x - event.clientX) + event.clientX,
      y: (nextScale / scale) * (translate.y - event.clientY) + event.clientY,
    });
    setScale(nextScale);
  };

  const handleTranslate = event => {
    if (event.buttons === 1) {
      setTranslate({
        x: translate.x + event.movementX,
        y: translate.y + event.movementY,
      });
    }
  };

  return (
    <Box onWheel={handleScale} onMouseMove={handleTranslate} overflow="hidden">
      <Canvas area={area} scale={scale} translate={translate} />
    </Box>
  );
};

export default Preview;
