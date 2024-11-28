import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import DataPointInfo from './data_point_info';
import Change from './change';

export const Stats = ({ displayIndices, focus, selection, timeSeries }) => {

  const { firstPoint, lastPoint } = useMemo(() => {
    const displayPoints = displayIndices.filter((i) => {
      const timestamp = timeSeries[i].timestamp;
      return (timestamp >= selection.start && timestamp <= selection.end);
    }).map(i => timeSeries[i]);

    return {
      firstPoint: displayPoints[0],
      lastPoint: displayPoints[displayPoints.length - 1],
    };
  }, [timeSeries, displayIndices, selection]);

  return <div className="stats-container">
    <DataPointInfo
      dataPoint={firstPoint}
      label="Start"
    />
    <DataPointInfo
      dataPoint={lastPoint}
      label="End"
    />
    <Change end={lastPoint.value} start={firstPoint.value} />
    {focus && <DataPointInfo
      dataPoint={focus}
      label="Selected"
    />}
  </div>;
};

const mapStateToProps = ({ selection, focus, timeSeries, displayIndices }) => {
  return {
    displayIndices,
    focus,
    selection,
    timeSeries,
  };
};

export default connect(mapStateToProps)(Stats);