import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './components/App/App';
import './index.css';
import { CharacterProvider } from './contexts/CharacterContext';
ReactDOM.render(
  <BrowserRouter>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
