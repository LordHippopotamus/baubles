import { Box } from '@mui/material';
import { useSelectedTool } from 'hooks/editor';
import { useTransform } from 'hooks/transform';
import Canvas from './Canvas';

const Area = () => {
  const tool = useSelectedTool();

  const { scale, handleScale, translate, handleTranslate } = useTransform();

  return (
    <Box
      onWheel={tool === 'pan' && handleScale}
      onMouseMove={tool === 'pan' && handleTranslate}
      height={{ xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }}
      overflow="hidden"
    >
      <Canvas scale={scale} translate={translate} />
    </Box>
  );
};

export default Area;
