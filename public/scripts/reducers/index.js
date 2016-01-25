var actions = require('../actions');
var constants = require('../constants');
var combineReduces = require('redux').combineReducers;

function bars(state = [], action) {
  switch (action.type) {
  case constants.REQUEST_BARS:
    return state;
  case constants.REQUEST_BARS_SUCCESS:
    return action.bars;
  case constants.ADD_BAR:
    return state;
  case constants.ADD_BAR_SUCCESS:
    return [...state, action.bar];
  default:
    return state;
  }
};

module.exports = combineReduces({bars});
