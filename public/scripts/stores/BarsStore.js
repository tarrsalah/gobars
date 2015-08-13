var Dispatcher = require('../dispatcher/Dispatcher');
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

Dispatcher.register(function(action) {
  switch(action.actionType) {
  case AppActionTypes.INITIALISE:
    _bars.loading = action.payload.loading;
    BarsStore.emitChange();
    break;
  case AppActionTypes.INITIALISE_SUCCESS:
    _bars.loading = action.payload.loading;
    _bars.bars = action.payload.bars;
    BarsStore.emitChange();
    break;
  case AppActionTypes.INITIALISE_FAIL:
    _bars.loading = action.payload.loading;
    console.log(action.payload.error);
    BarsStore.emitChange();
    break;
  case BarsActionTypes.BARS_CREATE:
    _bars.loading = action.payload.loading;
    BarsStore.emitChange();
    break;
  case BarsActionTypes.BARS_CREATE_SUCCESS:
    _bars.loading = action.payload.loading;
    _bars.bars.push(action.payload.bar);
    BarsStore.emitChange();
    break;
  case BarsActionTypes.BARS_CREATE_FAIL:
    _bars.loading = action.payload.loading;
    console.log(action.payload.error);
    BarsStore.emitChange();
  }
});

module.exports = BarsStore;
