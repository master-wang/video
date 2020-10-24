import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from '@/stores';
import App from './App';
import '@/styles/index.less';
import './icons';

message.config({
  maxCount: 1
});

ReactDOM.render(
  <HashRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
