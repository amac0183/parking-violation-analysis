'use strict';

var Parking = Parking || {};

(function() {
	Parking.models = Parking.models || {};

	Parking.models.DailyCount = Backbone.Collection.extend({
		url: '/daily',
		parse: function(response) {
			return response;
		}
	});
})();