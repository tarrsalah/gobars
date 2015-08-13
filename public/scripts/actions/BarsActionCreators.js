var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/BarsConstants.js');
var fetch = require('whatwg-fetch');

fetch = window.fetch;

var BarsActions = {
  init() {
    Dispatcher.dispatch({
      actionType: Constants.BARS_INITIALISE,
      payload: {
        loading: true,
        bars: []
      }
    });

    fetch('/bars')
      .then(function(response){
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var err = new Error(response.statusText);
          err.response = response;
          throw err;
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(payload) {
        Dispatcher.dispatch({
          actionType: Constants.BARS_INITIALISE_SUCCESS,
          payload: {
            loding: false,
            bars: payload
          }
        });
      }).catch(function(err) {
        Dispatcher.dispatch({
          actionType: Constants.BARS_INITIALISE_FAIL,
          payload: {
            loading: false,
            error: err.message
          }
        });
      });
  },

  createBar(bar) {
    Dispatcher.dispatch({
      actionType: Constants.BARS_CREATE,
      payload: {
        loading: true
      }
    });

    fetch('/bars', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: bar
      })
    })
      .then(function(response){
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var err = new Error(response.statusText);
          err.response = response;
          throw err;
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(payload) {
        Dispatcher.dispatch({
          actionType: Constants.BARS_CREATE_SUCCESS,
          payload: {
            bar: payload,
            loading: false
          }
        });
      }).catch(function(err) {
        Dispatcher.dispatch({
          actionType: Constants.BARS_CREATE_FAIL,
          payload: {
            loading: false,
            error: err.message
          }
        });
      });
    }
};

module.exports = BarsActions;
