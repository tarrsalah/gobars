;(function(Ember, DS) {
    var App = Ember.Application.create({
	LOG_TRANSITIONS: true
    });

    window.App= App;

    App.ApplicationAdapter = DS.RESTAdapter.extend({
	host: 'http://localhost:3000'
    });

    App.ApplicationSerializer = DS.ActiveModelSerializer.extend({
	primaryKey: 'id'
    });

    App.Bar = DS.Model.extend({
	name: DS.attr('string')
    });


    App.ApplicationRoute = Ember.Route.extend({
	model: function() {
	    var bars = this.store.find('bar');
	    bars.then(function(bars) {
		console.log(bars.content); // I'm getting an empty array !
	    });
	    return bars;
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
