import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
// Redux imports. Provider will communicate between react and redux.
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from "redux-thunk";
import Reducer from "./reducers";
import 'materialize-css/dist/css/materialize.min.css'

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
// for the second argument, see https://github.com/zalmoxisus/redux-devtools-extension
  <Provider store={createStoreWithMiddleWare(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>

  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
