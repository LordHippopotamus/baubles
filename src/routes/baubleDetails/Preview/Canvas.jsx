import Rect from './Rect';

const Canvas = ({ area, scale, translate }) => (
  <svg
    width="100%"
    height="100%"
    viewBox={`0 0 1200 6000`}
    style={{
      transform: `scale(${scale})
                      translate(${translate.x / scale}px, ${translate.y / scale}px)`,
      transformOrigin: '0px 0px',
    }}
  >
    {area.map(el => (
      <Rect key={el.x + ';' + el.y} {...el} />
    ))}
  </svg>
);

export default Canvas;
