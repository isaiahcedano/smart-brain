import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import './index.css';
import { Provider } from 'react-redux';
import {
  changeLoginState,
  changeUserData
} from './redux/reducers/signinpage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const logger = createLogger();

const rootReducer = combineReducers({changeLoginState, changeUserData});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
      <App />,
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
