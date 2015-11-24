'use strict';
var Parking = Parking || {};

(function() {
	Parking.controllers = Parking.controllers || {};
	Parking.controllers.DailyCount = Marionette.Controller.extend({
		initialize: function() {
			this.collection = new Parking.models.DailyCount();

			this.chart = new Parking.views.d3.BarChart({
                el: this.options.regions.chart.el,
                collection: this.collection,
                xAttr: 'dateFormatted',
                yAttr: 'ticketCount'
			});
			this.table = new Parking.views.Table({
				collection: this.collection
			});

			this.listenTo(this.collection, 'sync', this.renderViews);

			this.collection.fetch();
		},
		renderViews: function() {
			this.chart.render();

			this.options.regions.table.show(this.table);
		}
	});
})();