import { Box } from '@mui/material';
import Canvas from './Canvas';
import { useTransform } from 'hooks/transform';

const Preview = ({ area }) => {
  const { scale, handleScale, translate, handleTranslate } = useTransform();

  return (
    <Box onWheel={handleScale} onMouseMove={handleTranslate} overflow="hidden">
      <Canvas area={area} scale={scale} translate={translate} />
    </Box>
  );
};

export default Preview;
