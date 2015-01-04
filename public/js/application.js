;(function(Ember, DS) {
    var App = Ember.Application.create({
	LOG_TRANSITIONS: true
    });

    window.App= App;

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
		var newBar = this.store.createRecord('bar', {
		    name: this.get("newBar")
		});
		newBar.save();
	    }
	}
    });
}(Ember, DS));
