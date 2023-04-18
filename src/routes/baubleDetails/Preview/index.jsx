import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Rect from './Rect';

const Preview = ({ area }) => (
  <TransformWrapper>
    <TransformComponent
      contentStyle={{ height: '100%', width: '100%' }}
      wrapperStyle={{ height: '100%', width: '100%' }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 1200 6000`}>
        {area.map(el => (
          <Rect key={el.x + ';' + el.y} {...el} />
        ))}
      </svg>
    </TransformComponent>
  </TransformWrapper>
);

export default Preview;
