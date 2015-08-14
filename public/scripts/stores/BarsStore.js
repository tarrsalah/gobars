var register = require('../dispatcher').register;
var createStore = require('../utils/StoreUtils.js').createStore;
var BarsActionTypes = require('../constants').BarsActionTypes;
var AppActionTypes = require('../constants').AppActionTypes;

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
  case AppActionTypes.INITIALISE:
    _bars.loading = true;
    BarsStore.emitChange();
    break;
  case AppActionTypes.INITIALISE_SUCCESS:
    _bars.loading = false;
    _bars.bars = action.payload;
    BarsStore.emitChange();
    break;
  case AppActionTypes.INITIALISE_FAIL:
    _bars.loading = false;
    console.log(action.payload);
    BarsStore.emitChange();
    break;
  case BarsActionTypes.BARS_CREATE:
    _bars.loading = true;
    BarsStore.emitChange();
    break;
  case BarsActionTypes.BARS_CREATE_SUCCESS:
    _bars.loading = false;
    _bars.bars.push(action.payload);
    BarsStore.emitChange();
    break;
  case BarsActionTypes.BARS_CREATE_FAIL:
    _bars.loading = false;
    console.log(action.payload);
    BarsStore.emitChange();
  }
});

module.exports = BarsStore;
