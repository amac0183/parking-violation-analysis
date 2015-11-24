'use strict';
var Parking = Parking || {};

(function() {
    var TableRowView = Marionette.ItemView.extend({
        tagName: 'tr',
        render: function() {
            this.$el
                .append($('<td>' + this.model.get(this.options.attr.x) + '</td>')
                    .attr('class', 'text-left'))
                .append($('<td>' + this.model.get(this.options.attr.y) + '</td>')
                    .attr('class', 'text-right'));

            return this;
        }
    });

    Parking.views = Parking.views || {};
    Parking.views.Table = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table',
        template: '#counts-table-template',
        childView: TableRowView,
        childViewContainer: 'tbody',
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
})();