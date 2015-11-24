'use strict';
var Parking = Parking || {};

(function () {
    /* 
     * Backbone Applicaton that runs the Parking Violation Analysis App 
     */
	Parking.App = new Marionette.Application();
	Parking.App.addRegions({
    	dailyCountChartRegion: 'div#monthly-chart',
        dailyCountTableRegion: 'div#monthly-table'
	});

	Parking.App.on('start', function() {
    	this.dailyCountCtrl = new Parking.controllers.DailyCount({
            regions: {
                chart: this.dailyCountChartRegion,
                table: this.dailyCountTableRegion
            }
    	});
	});

	Parking.App.start();
})();
