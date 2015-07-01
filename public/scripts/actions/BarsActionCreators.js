var Dispatcher = require('../dispatcher/Dispatcher');
var BarsConstants = require('../constants/BarsConstants');
var Request = require('superagent');

var BarsActions = {
  create: function(text) {

	if (text.trim() != "") {
	  Request
		.post('/bars')
		.send({name: text})
		.end(function(err, response){
		  if (err != null) {
			console.log(err);
			return;
		  }
		  Dispatcher.dispatch({
			actionType: BarsConstants.BARS_CREATE,
			bar: response.body
		  });
		});
	}
  },

  initbars: function() {
	Request
	  .get('/bars')
	  .end(function(err, response){
		if (err != null) {
		  console.log(err);
		  return;
		}

		Dispatcher.dispatch({
		  actionType: BarsConstants.BARS_INIT,
		  bars: response.body
		});
	  });
  }
};

module.exports = BarsActions;
