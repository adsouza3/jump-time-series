import React from 'react';

import { Provider } from 'react-redux';
import store from '../store';

import ConnectedPage from './page';

export const Page = () => {
  return <Provider store={store}>
    <ConnectedPage />
  </Provider>;
};

export default Page;