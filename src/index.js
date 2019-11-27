import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import { CharacterProvider } from './contexts/CharacterContext';
import 'normalize.css';
import './index.css';

import {
  faBolt,
  faBiohazard,
  faFire,
  faSnowflake,
  faRadiation,
  faAngleRight,
  faAngleDown,
  faPlus,
  faMinus,
  faChevronUp,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBolt,
  faBiohazard,
  faFire,
  faSnowflake,
  faRadiation,
  faAngleRight,
  faAngleDown,
  faPlus,
  faMinus,
  faChevronUp,
  faChevronDown
);

ReactDOM.render(
  <BrowserRouter>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
