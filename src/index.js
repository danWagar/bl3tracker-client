import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import './index.css';

/*
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

import {
} from '@fortawesome/free-solid-svg-icons'

library.add(
)
*/

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
