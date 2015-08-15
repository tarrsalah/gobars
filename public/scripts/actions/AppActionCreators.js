var ActionTypes = require('../constants');
var dispatchAsync = require('../dispatcher').dispatchAsync;
var Api = require('../utils/APIUtils.js');

var AppActions = {
  init() {
    dispatchAsync(Api.getBars(), {
      request: ActionTypes.APP_INITIALISE_REQUEST,
      success: ActionTypes.APP_INITIALISE_SUCCESS,
      failure: ActionTypes.APP_INITIALISE_FAIL
    });
  }
};

module.exports = AppActions;
