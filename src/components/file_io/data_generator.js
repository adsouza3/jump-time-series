import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { beginFileRead, setTimeSeries } from '../../store/actions';

export const DataGenerator = ({ beginFileRead, loading, setTimeSeries }) => {
  const [sampleSize, setSampleSize] = useState(10000000);

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const w = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

    w.onmessage = (event) => {
      setTimeSeries(event.data);
    };

    setWorker(w);

    return () => {
      w.terminate();
    };
  }, []);

  if (loading) {
    return null;
  }

  const handleGenerate = () => {
    beginFileRead();
    if (worker) {
      worker.postMessage({ sampleSize });
    }
  };

  return <div className="data-generator-container">
    <input type="number" value={sampleSize} onChange={({ target: { value } }) => setSampleSize(value)} />
    <button onClick={handleGenerate}>Generate</button>
  </div>;
};

const mapDispatchToProps = {
  beginFileRead,
  setTimeSeries,
};

export default connect(null, mapDispatchToProps)(DataGenerator);