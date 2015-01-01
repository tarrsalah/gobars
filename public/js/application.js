;(function(Ember) {
    var App = Ember.Application.create({
	LOG_TRANSITIONS: true
    });

    window.App= App;

    App.ApplicationController = Ember.Controller.extend({
	actions: {
	    addBar: function() {
		console.log(this.get("newBar"));
	    }
	}
    });
}(Ember));
