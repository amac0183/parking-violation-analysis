'use strict';
var Parking = Parking || {};

(function() {
	Parking.controllers = Parking.controllers || {};
	Parking.controllers.ChartTable = Marionette.Controller.extend({
		initialize: function() {
			this.collection = new Parking.models.ChartTable({
				url: this.options.url
			});

			this.chart = new Parking.views.d3.BarChart({
                el: this.options.regions.chart.el,
                collection: this.collection,
                xAttr: this.options.attr.x,
                yAttr: this.options.attr.y
			});
			
			this.table = new Parking.views.Table({
				collection: this.collection,
				childViewOptions: {
					attr: this.options.attr
				},
				headings: this.options.headings
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