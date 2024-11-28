import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';

import { recenter } from '../../store/actions';

import { Stage, Layer, Rect } from 'react-konva';

import './styles.css';
import Step from '../display/step';
import Selection from './selection';

export const Scroll = ({ recenter, selection, timeSeries }) => {
  const windowRef = useRef(null);
  const rectRef = useRef(null);

  function useWindowWidth() {
    const [width, setWidth] = useState(1000);
    useLayoutEffect(() => {
      function updateSize() {
        const { width } = windowRef.current.getBoundingClientRect();
        setWidth(width);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return width;
  }

  const width = useWindowWidth();
  const height = 100;

  const SAMPLE_COUNT = 100;
  const scrollPoints = useMemo(() => {
    const delta = (timeSeries[timeSeries.length - 1].timestamp - timeSeries[0].timestamp) / SAMPLE_COUNT;
    return timeSeries.filter(({ timestamp }, i) => {
      return (i === 0 || Math.floor(timestamp / delta) !== Math.floor(timeSeries[i - 1].timestamp / delta));
    });
  }, [timeSeries]);

  const { max, min, start, end } = useMemo(() => {
    let max = scrollPoints[0].value;
    let min = scrollPoints[0].value;
    scrollPoints.forEach(({ value }) => {
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
      start: scrollPoints[0].timestamp,
      end: scrollPoints[scrollPoints.length - 1].timestamp,
    };
  }, [scrollPoints]);

  const handleClick = () => {
    recenter(start + rectRef.current.getRelativePointerPosition().x / width * (end - start));
  };

  return <div className="scroll-container" ref={windowRef}>
    <div className="scroll-inner">
      <Stage height={height} listening ref={rectRef} width={width} onClick={handleClick}>
        <Layer>
          <Rect
            fill="black"
            height={height}
            key="bg"
            width={width}
            x={0}
            y={0}
          />
          {(scrollPoints || []).map((point, i) => {
            return (
              <Step
                d1={point}
                d2={scrollPoints[i + 1]}
                end={end}
                height={height}
                ignoreAxes
                key={point.timestamp}
                max={max}
                min={min}
                start={start}
                width={width}
              />
            );
          })}
          <Selection
            end={end}
            height={height}
            selection={selection}
            start={start}
            width={width}
          />
        </Layer>
      </Stage>
    </div>
  </div>;
};

const mapStateToProps = ({ selection, timeSeries }) => {
  return {
    selection,
    timeSeries,
  };
};

const mapDispatchToProps = {
  recenter
};

export default connect(mapStateToProps, mapDispatchToProps)(Scroll);