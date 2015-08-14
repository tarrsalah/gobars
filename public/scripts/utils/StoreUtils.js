var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'CHANGE_EVENT';

function createStore(spec) {
  var emitter = new EventEmitter();

  return assign({
    emitChange() {
      emitter.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      emitter.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      emitter.removeListener(CHANGE_EVENT, callback);
    }
  }, spec);
}

module.exports = {
  createStore
};
