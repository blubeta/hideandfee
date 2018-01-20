import React from 'react';
import { render } from 'react-dom';

import './styles.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const MOUNT_NODE = document.getElementById('root');

render(
  <App />,
  MOUNT_NODE
);

registerServiceWorker();
