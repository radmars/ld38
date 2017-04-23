"use strict";

LD38.Tank = LD38.Note.extend({
	init: function(x) {
		this._super(LD38.Note, 'init', [x, 125, {
			image: "tank",
			key: "left",
		}]);
	},
});
