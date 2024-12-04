import React from 'react';

import { getTimeString } from 'lib/time';

const DataPointInfo = ({ dataPoint, label }) => {
  const timeString = getTimeString(dataPoint.timestamp);

  return <div className="data-point-info">
    <div className="data-point-label">{label}</div>
    <div className="data-point-value">{dataPoint.value}</div>
    <div>{timeString}</div>
  </div>;
};

export default DataPointInfo;