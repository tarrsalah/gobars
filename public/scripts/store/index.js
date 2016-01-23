var createStore= require('redux').createStore;
var combineReducers = require('redux').combineReducers;
var rootReducer = require('../reducers');

module.exports = createStore(rootReducer);
