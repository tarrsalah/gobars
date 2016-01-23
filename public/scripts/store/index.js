var createStore= require('redux').createStore;
var combineReducers = require('redux').combineReducers;
var reducer= require('../reducers');

module.exports = createStore(reducer);
