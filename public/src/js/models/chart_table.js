'use strict';
/* global Backbone */
/* global Parking */

/*
 * Model that fetches data based on a relative url provided in the options
 *
 * @params {object} options
 * @params {string} options.url relative url to fetch the data
 */
Parking.models.ChartTable = Backbone.Collection.extend({
    initialize: function(options) {
        this.url = options.url;
    },
    parse: function(response) {
        return response;
    }
});