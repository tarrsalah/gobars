var ActionTypes = require('../constants');
var flux = require('../dispatcher');
var Api = require('../utils/APIUtils.js');

var BarsActions = {
  addBar(bar){
  flux.dispatchAsync(Api.addBar(bar), {
    request: ActionTypes.BARS_CREATE_REQUEST,
    success: ActionTypes.BARS_CREATE_SUCCESS,
    failure: ActionTypes.BARS_CREATE_FAILURE
  });
  }
};

module.exports = BarsActions;
