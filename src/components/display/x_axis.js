import React, { useMemo } from 'react';

import { Line, Text } from 'react-konva';
import { Y_AXIS_WIDTH } from './y_axis';
import { getTimeString, intervals } from 'lib/time';

export const X_AXIS_HEIGHT = 30;
const TICK_MARK_LENGTH = 5;
const FONT_SIZE = 12;
const LABEL_WIDTH = 50;
const COLOR = '#AAA';

const XAxis = ({ height, width, min, max, selection }) => {
  const range = max - min;
  const axisY = height - X_AXIS_HEIGHT;

  const marks = useMemo(() => {
    const marks = [];
    const spacing = intervals[selection.mode].xAxisSpacing;

    let value = Math.ceil(min / spacing) * spacing;
    while (value < max) {
      marks.push(value);
      value += spacing;
    }

    return marks;
  }, [selection, min, max]);

  return <React.Fragment>
    <Line
      key="axis"
      points={[0, 0, width - Y_AXIS_WIDTH, 0]}
      stroke={COLOR}
      x={Y_AXIS_WIDTH}
      y={axisY}
    />
    {marks.map(mark => {
      const markX = Y_AXIS_WIDTH + (width - Y_AXIS_WIDTH) * (mark - min) / range;

      return <React.Fragment key={mark}>
        <Text
          align="center"
          fontSize={FONT_SIZE}
          key={`text-${mark}`}
          stroke={COLOR}
          strokeWidth={1}
          text={getTimeString(mark)}
          width={LABEL_WIDTH}
          x={markX - LABEL_WIDTH / 2}
          y={axisY + TICK_MARK_LENGTH}
        />
        <Line
          key={`line-${mark}`}
          points={[0, 0, 0, TICK_MARK_LENGTH]}
          stroke={COLOR}
          x={markX}
          y={axisY}
        />
      </React.Fragment>;
    })}
  </React.Fragment>;
};

export default XAxis;