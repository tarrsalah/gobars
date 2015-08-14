var register = require('../dispatcher').register;
var EventEmitter = require('events').EventEmitter;
var BarsActionTypes = require('../constants').BarsActionTypes;
var AppActionTypes = require('../constants').AppActionTypes;
var assign = require('object-assign');

var CHANGE_EVENT = 'event';
var _bars = {
  bars: [],
  loading: false
};

var BarsStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

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
