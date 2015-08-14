var Dispatcher = require('flux').Dispatcher;
var flux = new Dispatcher();

function register(callback) {
  return flux.register(callback);
}

function dispatch(actionType, payload) {
  if (!actionType) {
    throw new Error('You forgot to specify a type.');
  }

  flux.dispatch({actionType, payload});
}

function dispatchAsync(promise, actionTypes) {
  dispatch(actionTypes.request);
  promise.then(function(response){
    dispatch(actionTypes.success, response);
  }, function(error) {
    dispatch(actionTypes.failure, error);
  });
}

module.exports = {
  register,
  dispatch,
  dispatchAsync
};
