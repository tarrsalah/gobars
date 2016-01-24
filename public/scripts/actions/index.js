require('whatwg-fetch');
var fetch = window.fetch;

const ADD_BAR = 'ADD_BAR';
const ADD_BAR_SUCCESS = 'ADD_BAR_SUCCESS';

const REQUEST_BARS = 'REQUEST_BARS';
const REQUEST_BARS_SUCCESS = 'REQUEST_BARS_SUCCESS';

const API = '/bars';

function requestBars() {
  return {
    type: REQUEST_BARS
  };
}

function requestBarsSuccess(response) {
  return {
    type: REQUEST_BARS_SUCCESS,
    bars: response
  };
}

function fetchBars() {
  return dispatch => {
    dispatch(requestBars());
    return fetch(API)
      .then(response => response.json())
      .then(response => {
        dispatch(requestBarsSuccess(response));
      });
  };
}


function addBarRequest() {
  return {
    type: ADD_BAR
  };
}

function addBar(text) {
  return {
    type: ADD_BAR_SUCCESS,
    text: text
  };
}

function asyncAddBar(text) {
  return dispatch => {
    dispatch(addBarRequest());

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
        dispatch(addBar(response.name));
      });
  };
}

module.exports = {
  ADD_BAR, ADD_BAR_SUCCESS ,REQUEST_BARS, REQUEST_BARS_SUCCESS,
  actions:{asyncAddBar, fetchBars}
};
