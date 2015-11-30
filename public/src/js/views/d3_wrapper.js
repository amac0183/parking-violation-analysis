'use strict';
/* global _ */
/* global d3 */
/* global Marionette */
/* global Parking */

/*
 * Base d3 chart wrapped in a Marionette ItemView
 *
 * @param {object} options
 * @param {object} options.margin         custom margin values
 * @param {int}    options.margin.top
 * @param {int}    options.margin.right
 * @param {int}    options.margin.bottom
 * @param {int}    options.margin.left
 * @param {string} options.xAttr          attribute name stored in the model for the x data
 * @param {string} options.yAttr          attribute name stored in the model for the y data
 */
var ChartBase = Marionette.ItemView.extend({
    defaults: {
        margin: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        xAttr: 'x',
        yAttr: 'y'
    },
    initialize: function(options) {
        this.options = _.extend({}, this.options, this.defaults, options);
        this.el = this.options.el;
    },
    render: function() {
        var margin = this.options.margin;
        this.width = this.$el.width() - margin.left - margin.right;
        this.height = this.$el.height() - margin.top - margin.bottom;

        this.svg = d3.select(this.el).append('svg')
            .attr('width', this.width + margin.left + margin.right)
            .attr('height', this.height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        this.scales = {
            x: this.getXScale(),
            y: this.getYScale()
        };

        this.renderAxes();
        this.renderData();

        return this;
    },
    mapData: function() {
        var raw = this.collection.toJSON();
        var data = [];
        var self = this;
        _.each(raw, function(datapoint) {
            data.push({
                x: datapoint[self.options.xAttr],
                y: datapoint[self.options.yAttr]
            });
        });

        return data;
    }
});

Parking.views.d3 = {}; // plan to add other D3 charts

/*
 * Marionette ItemView based D3 bar chart.
 *
 * @param {object} options
 * @param {float}  options.barPadding  padding between the bars.
 */
Parking.views.d3.BarChart = ChartBase.extend({
    defaults: _.defaults({
        barPadding: 0.1
    }, ChartBase.prototype.defaults),
    getXScale: function() {
        var padding = this.options.barPadding;
        return d3.scale.ordinal()
            .rangeRoundBands([0, this.width], padding)
            .domain(this.collection.pluck(this.options.xAttr));
    },
    getYScale: function() {
        return d3.scale.linear()
            .rangeRound([this.height, 0])
            .domain([0, d3.max(this.collection.pluck(this.options.yAttr))]);
    },
    renderAxes: function() {
        var xAxis = d3.svg.axis()
            .scale(this.scales.x)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(this.scales.y)
            .orient('left');

        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(xAxis);

        this.svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
    },
    renderData: function() {
        var chart = this;
        var x = this.scales.x;
        var y = this.scales.y;

        this.svg.selectAll('.bar')
            .data(this.mapData())
        .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', function(d) {
                return x(d.x);
            })
            .attr('width', x.rangeBand())
            .attr('y', function(d) {
                return y(d.y);
            })
            .attr('height', function(d) {
                return chart.height - y(d.y);
            });
    }
});