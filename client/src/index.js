import React from 'react';
import ReactDOM from 'react-dom/client';



import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'

import {Provider} from 'react-redux'
import { userloginreducer, userregisterreducer} from './reducer/userreducer'
let middleware = [thunk]
let reducer = combineReducers({
  userlogin:userloginreducer,


  userregister:userregisterreducer
})

let userinfofromstorage = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null

let intialstate = {
  userlogin:{ userinfo:userinfofromstorage},
  
}

let store = createStore(reducer, intialstate, composeWithDevTools(applyMiddleware(...middleware)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={'loading'}>
    <Provider store={store}> 

    <App />
    
    </Provider>
    </React.Suspense>
    
  </React.StrictMode>
);