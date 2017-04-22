"use strict";

LD38.Hoop = LD38.Note.extend({
	init: function(x) {
		this._super(LD38.Note, 'init', [x, 75, {
			image: "hoops",
		}]);
	},
});
