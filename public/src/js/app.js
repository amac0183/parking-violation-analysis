'use strict';
var Parking = Parking || {};

(function () {
    /* 
     * Backbone Applicaton that runs the Parking Violation Analysis App 
     */
    Parking.App = new Marionette.Application();
    Parking.App.addRegions({
        dailyCountChartRegion: 'div#daily div.data-chart',
        dailyCountTableRegion: 'div#daily div.data-table',
        topMakeChartRegion: 'div#make div.data-chart',
        topMakeTableRegion: 'div#make div.data-table',
        topStateChartRegion: 'div#state div.data-chart',
        topStateTableRegion: 'div#state div.data-table'
    });

    Parking.App.on('start', function() {
        this.dailyCountCtrl = new Parking.controllers.ChartTable({
            attr: {
                x: 'date_formatted',
                y: 'ticket_count'
            },
            headings: {
                x: 'Date',
                y: '# of Tickets'
            },
            url: '/daily',
            regions: {
                chart: this.dailyCountChartRegion,
                table: this.dailyCountTableRegion
            }
        });

        this.topStateCtrl = new Parking.controllers.ChartTable({
            attr: {
                x: 'state',
                y: 'ticket_count'
            },
            headings: {
                x: 'State',
                y: '# of Tickets'
            },
            url: '/state_rank_10',
            regions: {
                chart: this.topStateChartRegion,
                table: this.topStateTableRegion
            }
        });

        this.topMakeCtrl = new Parking.controllers.ChartTable({
            attr: {
                x: 'vehicle_make',
                y: 'ticket_count'
            },
            headings: {
                x: 'Make',
                y: '# of Tickets'
            },
            url: '/make_rank_10',
            regions: {
                chart: this.topMakeChartRegion,
                table: this.topMakeTableRegion
            }
        });
    });

    Parking.App.start();
})();
