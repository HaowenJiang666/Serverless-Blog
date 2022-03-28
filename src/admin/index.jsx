import React from 'react';
import ReactDOM from 'react-dom';
import HomeManagement from './container/HomeManagement'
import { Provider } from 'react-redux';
import store from './store';

import 'normalize.css';
import 'antd/dist/antd.css';
import './style.scss'

ReactDOM.render(
  <Provider store={store}>
    <HomeManagement />
  </Provider>,
  document.getElementById('root')
);

