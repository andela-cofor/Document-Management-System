import ReactDom from 'react-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App.component';

const history = createHistory();

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
       <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-app')
);
