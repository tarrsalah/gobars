var createStore= require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var combineReducers = require('redux').combineReducers;
var createLogger = require('redux-logger');
var thunkMiddleware = require('redux-thunk');
var rootReducer = require('../reducers');
var actions = require('../actions').actions;

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

var store = createStoreWithMiddleware(rootReducer);

store.dispatch(actions.fetchBars());
module.exports = store;
