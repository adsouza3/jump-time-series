import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useDropzone } from 'react-dropzone';

import { beginFileRead, setTimeSeries } from 'store/actions';

const Dropzone = ({ beginFileRead, loading, setTimeSeries }) => {

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

  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop: (files) => {
      beginFileRead();
      if (worker) {
        worker.postMessage({ file: files[0] });
      }
    },
  });

  if (loading) {
    return null;
  }

  return (
    <div className="dropzone-container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop data file here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  beginFileRead,
  setTimeSeries,
};

export default connect(null, mapDispatchToProps)(Dropzone);