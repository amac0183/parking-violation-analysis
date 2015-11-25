'use strict';
Parking.models.ChartTable = Backbone.Collection.extend({
    initialize: function(options) {
        this.url = options.url;
    },
    parse: function(response) {
        return response;
    }
});