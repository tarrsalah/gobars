var ActionTypes = require('../constants');
var flux = require('../dispatcher');
var Api = require('../utils/APIUtils.js');

var AppActions = {
  init() {
    flux.dispatchAsync(Api.getBars(), {
      request: ActionTypes.APP_INITIALISE_REQUEST,
      success: ActionTypes.APP_INITIALISE_SUCCESS,
      failure: ActionTypes.APP_INITIALISE_FAIL
    });
  }
};

module.exports = AppActions;
