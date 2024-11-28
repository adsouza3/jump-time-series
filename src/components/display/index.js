import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { clearFocus, setFocus } from '../../store/actions';

import _ from 'lodash';

import { Stage, Layer, Rect } from 'react-konva';

import Step from './step';
import XAxis, { X_AXIS_HEIGHT } from './x_axis';
import YAxis, { Y_AXIS_WIDTH } from './y_axis';

import './styles.css';
import Focus from './focus';

export const Display = ({ clearFocus, displayIndices, focus, selection, setFocus, timeSeries }) => {
  const windowRef = useRef(null);
  const rectRef = useRef(null);

  const [hovered, setHovered] = useState(false);

  function useWindowSize() {
    const [size, setSize] = useState([1000, 500]);
    useLayoutEffect(() => {
      function updateSize() {
        const { width, height } = windowRef.current.getBoundingClientRect();
        setSize([width, height]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const [width, height] = useWindowSize();

  const displayPoints = useMemo(() => {
    return displayIndices.filter((i) => {
      const timestamp = timeSeries[i].timestamp;
      return (timestamp >= selection.start && timestamp <= selection.end);
    }).map(i => timeSeries[i]);
  }, [timeSeries, displayIndices, selection]);

  const { max, min, start, end } = useMemo(() => {
    let max = displayPoints[0].value;
    let min = displayPoints[0].value;
    displayPoints.forEach(({ value }) => {
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });

    return {
      max,
      min,
      start: displayPoints[0].timestamp,
      end: displayPoints[displayPoints.length - 1].timestamp,
    };
  }, [displayPoints]);

  const handleMouseMove = _.throttle(() => {
    if (!hovered) {
      return;
    }

    const { x, y } = rectRef.current.getRelativePointerPosition();
    if (x < width && x > Y_AXIS_WIDTH && y < height - X_AXIS_HEIGHT && y > 0) {
      const trueX = x - Y_AXIS_WIDTH;
      setFocus(start + trueX / (width - Y_AXIS_WIDTH) * (end - start));
    } else {
      clearFocus();
    }
  }, 50);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    clearFocus();
    setHovered(false);
  };

  return <div className="display-container" ref={windowRef}>
    <Stage
      height={height}
      listening
      ref={rectRef}
      width={width}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Layer>
        <Rect
          fill="black"
          height={height}
          key="bg"
          width={width}
          x={0}
          y={0}
        />
        <XAxis
          height={height}
          key="xAxis"
          max={displayPoints[displayPoints.length - 1].timestamp}
          min={displayPoints[0].timestamp}
          selection={selection}
          width={width}
        />
        <YAxis
          height={height}
          key="yAxis"
          max={max}
          min={min}
          width={width}
        />
        {focus && (
          <Focus
            end={end}
            focus={focus}
            height={height}
            max={max}
            min={min}
            start={start}
            width={width}
          />
        )}
        {(displayPoints || []).map((point, i) => {
          return (
            <Step
              d1={point}
              d2={displayPoints[i + 1]}
              end={end}
              height={height}
              key={point.timestamp}
              max={max}
              min={min}
              start={start}
              width={width}
            />
          );
        })}
      </Layer>
    </Stage>
  </div>;
};

const mapStateToProps = ({ selection, timeSeries, displayIndices, focus }) => {
  return {
    displayIndices,
    focus,
    selection,
    timeSeries,
  };
};

const mapDispatchToProps = {
  clearFocus,
  setFocus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);