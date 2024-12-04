import React from 'react';
import { connect } from 'react-redux';

import { zoomIn, zoomOut } from 'store/actions';

import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';

import { SECONDS_5, HOURS_8, intervals } from 'lib/time';

export const Controls = ({ selection, timeSeries, zoomIn, zoomOut }) => {
  const timeSeriesLength = timeSeries[timeSeries.length - 1].timestamp - timeSeries[0].timestamp;
  const fullyDisplayed = intervals[selection.mode].length > timeSeriesLength;
  return <div className="controls-container">
    <Button disabled={selection.mode === SECONDS_5} icon onClick={zoomIn}>
      <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="xl"/>
    </Button>
    <Button disabled={selection.mode === HOURS_8 || fullyDisplayed} icon onClick={zoomOut}>
      <FontAwesomeIcon icon={faMagnifyingGlassMinus} size="xl"/>
    </Button>
  </div>;
};

const mapStateToProps = ({ selection, timeSeries }) => {
  return {
    selection,
    timeSeries,
  };
};

const mapDispatchToProps = {
  zoomIn,
  zoomOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);