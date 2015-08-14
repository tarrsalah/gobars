var AppActionTypes = require('../constants').AppActionTypes;
var dispatchAsync = require('../dispatcher').dispatchAsync;
var Api = require('../utils/APIUtils.js');

var AppActions = {
  init() {
    dispatchAsync(Api.getBars(), {
      request: AppActionTypes.INITIALISE_REQUEST,
      success: AppActionTypes.INITIALISE_SUCCESS,
      failure: AppActionTypes.INITIALISE_FAIL
    });
  }
};

module.exports = AppActions;
