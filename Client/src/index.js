import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {thunk} from  'redux-thunk';

let initialStore={employeesLoginData:{}}

let loginReducer=(latestStore=initialStore,dispatchObj)=>{

  if(dispatchObj.type=='employeesLogData')
    return {...latestStore,employeesLoginData:dispatchObj.data};

  return latestStore;
}

let tasksReducer=(latestStore=initialStore,dispatchObj)=>{
  
  if(dispatchObj.type=='assignedTasks')
    return {...latestStore,employeesLoginData:dispatchObj.data};
  if(dispatchObj.type=='completedTasks')
    return {...latestStore,employeesLoginData:dispatchObj.data};
  if(dispatchObj.type=='pendingTasks')
    return {...latestStore,employeesLoginData:dispatchObj.data};

  return latestStore;
}
let leavesReducer=(latestStore=initialStore,dispatchObj)=>{
  
  if(dispatchObj.type=='appliedLeaves')
    return {...latestStore,employeesLoginData:dispatchObj.data};
  if(dispatchObj.type=='')
    return {...latestStore,employeesLoginData:dispatchObj.data};
  if(dispatchObj.type=='approvedLeaves')
    return {...latestStore,employeesLoginData:dispatchObj.data};

  return latestStore;
}



let store=createStore(combineReducers({loginReducer,tasksReducer,leavesReducer}),applyMiddleware(thunk));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
