import React from 'react';

import { Line } from 'react-konva';

import { Y_AXIS_WIDTH } from './y_axis';
import { X_AXIS_HEIGHT } from './x_axis';

export const Step = ({ d1, d2, max, min, start, end, width, height, ignoreAxes }) => {
  if (!d2) {
    return null;
  }

  const trueWidth = width - (ignoreAxes ? 0 : Y_AXIS_WIDTH);
  const trueHeight = height - (ignoreAxes ? 0 : X_AXIS_HEIGHT);

  const { value: v1, timestamp: t1 } = d1;
  const { value: v2, timestamp: t2 } = d2;

  const dx = trueWidth * (t2 - t1) / (end - start);
  const dy = trueHeight * (v1 - v2) / (max - min);


  let color = 'grey';
  if (v2 > v1) {
    color = 'green';
  } else if (v1 > v2) {
    color = 'red';
  }

  return (
    <Line
      points={[0, 0, dx, dy]}
      stroke={color}
      x={(ignoreAxes ? 0 : Y_AXIS_WIDTH) + 1 + trueWidth * (t1 - start) / (end - start)}
      y={trueHeight * (max - v1) / (max - min)}
    />
  );
};

export default Step;