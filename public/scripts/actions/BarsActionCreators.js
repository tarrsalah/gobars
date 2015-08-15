var ActionTypes = require('../constants');
var dispatchAsync = require('../dispatcher').dispatchAsync;
var Api = require('../utils/APIUtils.js');

var BarsActions = {
  addBar(bar){
  dispatchAsync(Api.addBar(bar), {
    request: ActionTypes.BARS_CREATE_REQUEST,
    success: ActionTypes.BARS_CREATE_SUCCESS,
    failure: ActionTypes.BARS_CREATE_FAILURE
  });
  }
};

module.exports = BarsActions;
