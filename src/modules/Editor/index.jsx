import { Box } from '@mui/material';
import { useState } from 'react';
import { useEditorStore } from './editorStore';
import Canvas from './Canvas';

const Editor = () => {
  const tool = useEditorStore(state => state.tool);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleScale = event => {
    if (tool === 'pan') {
      const delta = event.wheelDelta ? event.wheelDelta : -event.deltaY;
      const nextScale = delta > 0 ? scale * 1.2 : scale * 0.8;
      setTranslate({
        x: (nextScale / scale) * (translate.x - event.clientX) + event.clientX,
        y: (nextScale / scale) * (translate.y - event.clientY) + event.clientY,
      });
      setScale(nextScale);
    }
  };

  const handleTranslate = event => {
    if (event.buttons === 1 && tool === 'pan') {
      setTranslate({
        x: translate.x + event.movementX,
        y: translate.y + event.movementY,
      });
    }
  };

  return (
    <Box onWheel={handleScale} onMouseMove={handleTranslate} height="100vh" overflow="hidden">
      <Canvas scale={scale} translate={translate} />
    </Box>
  );
};

export default Editor;
