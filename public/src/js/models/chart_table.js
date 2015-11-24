'use strict';

var Parking = Parking || {};

(function() {
    Parking.models = Parking.models || {};

    Parking.models.ChartTable = Backbone.Collection.extend({
        initialize: function(options) {
            this.url = options.url;
        },
        parse: function(response) {
            return response;
        }
    });
})();