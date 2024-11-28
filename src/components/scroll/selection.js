import React from 'react';

import { Rect } from 'react-konva';

export const Selection = ({ selection, width, height, start, end }) => {
  if (!selection) {
    return null;
  }

  const range = end - start;
  const left = Math.max(0, width * (selection.start - start) / range);
  return (
    <Rect
      height={height}
      stroke="yellow"
      width={Math.min(width - left - 1, width * (selection.end - selection.start) / range)}
      x={left}
      y={0}
    />
  );
};

export default Selection;