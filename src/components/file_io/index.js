import React from 'react';
import { connect } from 'react-redux';

import LoadingSpinner from './loading_spinner';
import Dropzone from './dropzone';
import DataGenerator from './data_generator';

import './styles.css';

export const FileIo = ({ loading }) => {
  return <div className="file-io-container">
    <Dropzone loading={loading}/>
    {!loading && 'OR generate data'}
    <DataGenerator loading={loading}/>
    {loading && <LoadingSpinner />}
  </div>;
};

const mapStateToProps = ({ fileIo: { loading } }) => {
  return {
    loading
  };
};

export default connect(mapStateToProps)(FileIo);