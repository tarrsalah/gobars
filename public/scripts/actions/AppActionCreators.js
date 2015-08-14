var AppActionTypes = require('../constants').AppActionTypes;
var dispatchAsync = require('../dispatcher').dispatchAsync;
var Api = require('../utils/APIutils.js');

var AppActions = {
  init() {
    dispatchAsync(Api.getBars(), {
      request: AppActionTypes.INITIALISE,
      success: AppActionTypes.INITIALISE_SUCCESS,
      failure: AppActionTypes.INITIALISE_FAIL
    });
  }
};

module.exports = AppActions;
