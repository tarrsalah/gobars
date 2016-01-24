var actions = require('../actions');
var combineReduces = require('redux').combineReducers;

function bars(state = [], action) {
  switch (action.type) {
  case actions.REQUEST_BARS:
    return state;
  case actions.REQUEST_BARS_SUCCESS:
    return action.bars;
  case actions.ADD_BAR:
    return state;
  case actions.ADD_BAR_SUCCESS:
    return [...state, {name: action.text}];
  default:
    return state;
  }
};

module.exports = combineReduces({bars});
