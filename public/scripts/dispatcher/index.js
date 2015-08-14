var Dispatcher = require('flux').Dispatcher;
var flux = new Dispatcher();

function register(callback) {
  return flux.register(callback);
}

function dispatch(actionType, payload) {
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
