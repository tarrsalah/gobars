var BarActionTypes = require('../constants').BarsActionTypes;
var dispatchAsync = require('../dispatcher').dispatchAsync;
var Api = require('../utils/APIUtils.js');

var BarsActions = {
  addBar(bar){
  dispatchAsync(Api.addBar(bar), {
    request: BarActionTypes.CREATE_REQUEST,
    success: BarActionTypes.CREATE_SUCCESS,
    failure: BarActionTypes.CREATE_FAILURE
  });
  }
};

module.exports = BarsActions;
