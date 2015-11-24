'use strict';
var Parking = Parking || {};

(function() {
	var TableRowView = Marionette.ItemView.extend({
		tagName: 'tr',
		template: '#counts-table-row-template'
	});

	Parking.views = Parking.views || {};
	Parking.views.Table = Marionette.CompositeView.extend({
		tagName: 'table',
		className: 'table',
		template: '#counts-table-template',
		childView: TableRowView,
		childViewContainer: 'tbody'
	});
})();