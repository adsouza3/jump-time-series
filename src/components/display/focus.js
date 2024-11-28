import React from 'react';

import { Line } from 'react-konva';
import { Y_AXIS_WIDTH } from './y_axis';
import { X_AXIS_HEIGHT } from './x_axis';

const Focus = ({ end, focus, height, max, min, start, width }) => {
  const { value, timestamp } = focus;

  return <React.Fragment>
    <Line
      opacity={0.5}
      points={[0, 0, width - Y_AXIS_WIDTH, 0]}
      stroke="yellow"
      x={Y_AXIS_WIDTH}
      y={(max - value) * (height - X_AXIS_HEIGHT) / (max - min)}
    />
    <Line
      opacity={0.5}
      points={[0, 0, 0, height - X_AXIS_HEIGHT]}
      stroke="yellow"
      x={(timestamp - start) * (width - Y_AXIS_WIDTH) / (end - start) + Y_AXIS_WIDTH}
    />
  </React.Fragment>;
};

export default Focus;