import React, { useMemo } from 'react';

import { Line, Text } from 'react-konva';
import { X_AXIS_HEIGHT } from './x_axis';

export const Y_AXIS_WIDTH = 50;
const FONT_SIZE = 12;
const LABEL_PADDING = 5;
const COLOR = "#AAA";

const YAxis = ({ height, width, min, max }) => {
  const range = max - min;
  const trueHeight = height - X_AXIS_HEIGHT;

  const interval = useMemo(() => {
    const intervals = [5, 10, 50, 100, 500, 1000];
    const THRESHOLD_RATIO = 5;
    let interval = 1;
    intervals.forEach((i) => {
      if (range > i * THRESHOLD_RATIO) {
        interval = i;
      }
    });

    return interval;
  }, [range]);

  const marks = useMemo(() => {
    const marks = [];
    let value = Math.ceil(min / interval) * interval;
    while (value < max) {
      marks.push(value);
      value += interval;
    }

    return marks;
  }, [interval, min, max]);

  return <React.Fragment>
    <Line
      key="axis"
      points={[0, 0, 0, trueHeight]}
      stroke={COLOR}
      x={Y_AXIS_WIDTH}
    />
    {marks.map(mark => {
      const markY = trueHeight * (max - mark) / range;
      return <React.Fragment key={mark}>
        <Text
          align="right"
          fontSize={FONT_SIZE}
          key={`text-${mark}`}
          padding={LABEL_PADDING}
          stroke={COLOR}
          strokeWidth={1}
          text={mark}
          verticalAlign="center"
          width={Y_AXIS_WIDTH}
          x={0}
          y={markY - FONT_SIZE / 2 - LABEL_PADDING}
        />
        <Line
          key={`line-${mark}`}
          points={[0, 0, width - Y_AXIS_WIDTH, 0]}
          stroke={COLOR}
          x={Y_AXIS_WIDTH}
          y={markY}
        />
      </React.Fragment>;
    })}
  </React.Fragment>;
};

export default YAxis;