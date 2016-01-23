var actions = require('../actions');
var combineReduces = require('redux').combineReducers;

function bars(state = [], action) {
  switch (action.type) {
  case actions.ADD_BAR:
    return [...state, action.text];
  default:
    return state;
  }
};

module.exports = combineReduces({bars})
