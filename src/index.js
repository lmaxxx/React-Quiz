import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import rootReducer from './store/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
