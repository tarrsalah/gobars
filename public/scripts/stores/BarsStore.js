var register = require('../dispatcher').register;
var createStore = require('../utils/StoreUtils.js').createStore;
var ActionTypes = require('../constants');

var _bars = {
  bars: [],
  loading: false
};

var BarsStore = createStore({
  getAll() {
    return _bars.bars;
  },

  isLoading() {
    return _bars.loading;
  }
});

register(function(action) {
  switch(action.actionType) {
  case ActionTypes.APP_INITIALISE_REQUEST:
    _bars.loading = true;
    BarsStore.emitChange();
    break;
  case ActionTypes.APP_INITIALISE_SUCCESS:
    _bars.loading = false;
    _bars.bars = action.payload;
    BarsStore.emitChange();
    break;
  case ActionTypes.APP_INITIALISE_FAIL:
    _bars.loading = false;
    console.log(action.payload);
    BarsStore.emitChange();
    break;
  case ActionTypes.BARS_CREATE_REQUEST:
    _bars.loading = true;
    BarsStore.emitChange();
    break;
  case ActionTypes.BARS_CREATE_SUCCESS:
    _bars.loading = false;
    _bars.bars.push(action.payload);
    BarsStore.emitChange();
    break;
  case ActionTypes.BARS_CREATE_FAILURE:
    _bars.loading = false;
    console.log(action.payload);
    BarsStore.emitChange();
  }
});

module.exports = BarsStore;
