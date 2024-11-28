import React from 'react';

const Change = ({ start, end }) => {
  let change = null;
  if (start !== 0) {
    change = (end - start) / start;
  }

  let valueClass = 'data-point-value';
  if (change && change > 0) {
    valueClass += ' positive';
  }
  if (change && change < 0) {
    valueClass += ' negative';
  }

  let changeText = 'N/A';
  if (change) {
    changeText = Number(change).toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return <div className="data-point-info">
    <div className="data-point-label">Change</div>
    <div className={valueClass}>{changeText}</div>
  </div>;
};

export default Change;