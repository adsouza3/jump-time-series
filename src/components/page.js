import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './dashboard';
import Display from './display';
import FileIo from './file_io';
import Scroll from './scroll';

import './styles.css';

export const Page = ({ loaded }) => {
  return <div className="outer-container">
    {loaded ? <>
      <Dashboard />
      <Scroll />
      <Display />
    </> : <FileIo />}
  </div>;
};

const mapStateToProps = ({ fileIo: { loaded } }) => {
  return {
    loaded
  };
};

export default connect(mapStateToProps)(Page);