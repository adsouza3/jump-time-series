import React from 'react';

import { LineWave } from 'react-loader-spinner';

export const LoadingSpinner = () => {
  return <div className="spinner-container">
    <LineWave
      height="500"
      width="500"
    />
  </div>;
};

export default LoadingSpinner;
