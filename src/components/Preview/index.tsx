import { useTheme } from '@mui/material';
import { FC } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Area } from 'types';

type Props = {
  area: Area;
  wrapperProps?: any;
  componentProps?: any;
  svgProps?: any;
  rectProps?: any;
};

const Preview: FC<Props> = ({ area, wrapperProps, componentProps, svgProps, rectProps }) => {
  const { palette } = useTheme();

  return (
    <TransformWrapper {...wrapperProps}>
      <TransformComponent
        contentStyle={{ height: '100%', width: '100%' }}
        wrapperStyle={{ height: '100%', width: '100%' }}
        {...componentProps}
      >
        <svg width="100%" height="100%" viewBox={`0 0 1200 6000`} {...svgProps}>
          {area.map(el => (
            <path
              key={el.x + ';' + el.y}
              id={el.x + ';' + el.y}
              d={`M${el.x * 100} ${el.y * 100} H${el.x * 100 + 100} V${el.y * 100 + 100} H${
                el.x * 100
              } Z`}
              vectorEffect="non-scaling-stroke"
              fill={el.color || 'transparent'}
              stroke={palette.action.active}
              strokeWidth={1}
              {...rectProps}
            />
          ))}
        </svg>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Preview;
