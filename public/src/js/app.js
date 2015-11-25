'use strict';

window.Parking = {
    controllers: {},
    models: {},
    views: {},

    start: function() {
        var App = new Marionette.Application();
        App.addRegions({
            dailyCountChartRegion: 'div#daily div.data-chart',
            dailyCountTableRegion: 'div#daily div.data-table',
            topMakeChartRegion: 'div#make div.data-chart',
            topMakeTableRegion: 'div#make div.data-table',
            topStateChartRegion: 'div#state div.data-chart',
            topStateTableRegion: 'div#state div.data-table'
        });

        var dailyCountCtrl = new Parking.controllers.ChartTable({
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
                chart: App.dailyCountChartRegion,
                table: App.dailyCountTableRegion
            }
        });

        var topStateCtrl = new Parking.controllers.ChartTable({
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
                chart: App.topStateChartRegion,
                table: App.topStateTableRegion
            }
        });

        var topMakeCtrl = new Parking.controllers.ChartTable({
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
                chart: App.topMakeChartRegion,
                table: App.topMakeTableRegion
            }
        });
    }
};
