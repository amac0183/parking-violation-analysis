'use strict';
/* global Marionette */
/* global Parking */

/*
 * Controller for the chart and table component. The controller
 * creates the model and views, then adds a listener on the model
 * to render the views after fetching.
 *
 * @param {object}  options
 * @param {object}  options.attr
 * @param {string}  options.attr.x      attribute name in the model for the x data
 * @param {string}  options.attr.y      attribute name in the model for the y data
 * @param {object}  options.headings
 * @param {string}  options.headings.x  column heading text for the table for the x data
 * @param {string}  options.headings.y  column heading text for the table for the y data
 * @param {string}  options.url         relative url to fetch the data
 * @param {object}  options.regions
 * @param {object}  options.regions.chart  region for the chart
 * @param {object}  options.regions.table  region for the table
 */
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
    /*
     * Renders both the chart and the table.
     */
    renderViews: function() {
        this.chart.render();

        this.options.regions.table.show(this.table);
    }
});