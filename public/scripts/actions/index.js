require('whatwg-fetch');
var constants = require('../constants');
var fetch = window.fetch;

const API = '/bars';

module.exports.fetchBars = () => {
  return dispatch => {
    dispatch({type: constants.REQUEST_BARS});
    return fetch(API)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: constants.REQUEST_BARS_SUCCESS,
          bars: response
        });
      });
  };
};

module.exports.addBar = (text) => {
  return dispatch => {
    dispatch({type: constants.ADD_BAR});
    return fetch(API, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Name: text})
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: constants.ADD_BAR_SUCCESS,
          text: response.name
        });
      });
  };
};
