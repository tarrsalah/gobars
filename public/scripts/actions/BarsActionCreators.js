var BarActionTypes = require('../constants').BarsActionTypes;
var dispatchAsync = require('../dispatcher').dispatchAsync;
var Api = require('../utils/APIUtils.js');

var BarsActions = {
  addBar(bar){
  dispatchAsync(Api.addBar(bar), {
    request: BarActionTypes.BARS_CREATE,
    success: BarActionTypes.BARS_CREATE_SUCCESS,
    failure: BarActionTypes.BARS_CREATE_FAIL
  });
  }
};

module.exports = BarsActions;
