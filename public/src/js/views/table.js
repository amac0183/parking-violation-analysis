'use strict';
/* global $ */
/* global Marionette */
/* global Parking */

/*
 * Child view of the Parking.views.Table. This view render each row of a table.
 *
 * @param {object}  options
 * @param {object}  options.attr
 * @param {string}  options.attr.x attribute name in the model for the x data
 * @param {string}  options.attr.y attribute name in the model for the y data
 */
var TableRowView = Marionette.ItemView.extend({
    tagName: 'tr',
    render: function() {
        this.$el
            .append($('<td>' + this.model.get(this.options.attr.x) + '</td>')
                .attr('class', 'text-left'))
            .append($('<td>' + this.model.get(this.options.attr.y).toLocaleString() + '</td>')
                .attr('class', 'text-right'));

        return this;
    }
});

/*
 * View that renders the table. This CompositeView based object consists of
 * TableRowViews as the children.
 *
 * @param {object}  options
 * @param {object}  options.headings
 * @param {string}  options.headings.x column heading text for the table for the x data
 * @param {string}  options.headings.y column heading text for the table for the y data
 * @param {object}  options.childViewOptions  options for TableRowViews (please look
 * at the params for TableRowView above)
 */
Parking.views.Table = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table',
    template: '#counts-table-template',
    childView: TableRowView,
    childViewContainer: 'tbody',
    /*
     * Renders the table heading based on this.options.headings. If headings are
     * not provided in this.options, headings are not rendered in the table.
     */
    onRender: function() {
        if(!this.options.headings) {
            return;
        }

        var $tr = $('<tr></tr>')
            .append($('<th>' + this.options.headings.x + '</th>')
                .attr('class', 'text-left'))
            .append($('<th>' + this.options.headings.y + '</th>')
                .attr('class', 'text-right'));


        var $thead = this.$el.find('thead').append($tr);
    }
});