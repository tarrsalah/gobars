;(function(Ember, DS) {
    var App = Ember.Application.create({
	LOG_TRANSITIONS: true
    });

    window.App= App;

    App.ApplicationAdapter = DS.RESTAdapter.extend({
	host: 'http://localhost:3000'
    });

    App.Bar = DS.Model.extend({
	name: DS.attr('string')
    });


    App.ApplicationRoute = Ember.Route.extend({
	model: function() {
	    return this.store.find('bar');
	}
    });

    App.ApplicationController = Ember.Controller.extend({
	actions: {
	    addBar: function() {
		console.log(this.get("newBar"));
	    }
	}
    });
}(Ember, DS));
