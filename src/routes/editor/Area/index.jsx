import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useSelectedTool } from 'hooks/editor';
import Canvas from './Canvas';

const Area = () => {
  const tool = useSelectedTool();

  return (
    <TransformWrapper disabled={tool !== 'pan'}>
      <TransformComponent
        contentStyle={{ height: '100%', width: '100%' }}
        wrapperStyle={{ height: '100%', width: '100%' }}
      >
        <Canvas />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Area;
