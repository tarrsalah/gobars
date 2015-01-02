;(function(Ember, DS) {
    var App = Ember.Application.create({
	LOG_TRANSITIONS: true
    });

    window.App= App;

    App.Store = DS.Store.extend({
	adapter: DS.RESTAdapter
    });

    App.ApplicationController = Ember.Controller.extend({
	actions: {
	    addBar: function() {
		console.log(this.get("newBar"));
	    }
	}
    });
}(Ember, DS));
