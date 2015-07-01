var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var BarsConstants = require('../constants/BarsConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'event';
var _bars = [];

function createBar(bar) {
  _bars.push(bar);
}

function initBars(playoad){
  _bars = playoad;
}


var BarsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
	this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
	this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
	this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
	return _bars;
  }

});


Dispatcher.register(function(action) {
  switch(action.actionType) {
	case BarsConstants.BARS_CREATE:
	  createBar(action.bar);
	  BarsStore.emitChange();
	  break;
	case BarsConstants.BARS_INIT:
	  initBars(action.bars);
	  BarsStore.emitChange();
	  break;
  }
});

module.exports = BarsStore;