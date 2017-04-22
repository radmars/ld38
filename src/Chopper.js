"use strict";

LD38.Chopper = LD38.Note.extend({
	init: function(x) {
		this._super(LD38.Note, 'init', [x, 40, {
			image: "chopper",
		}]);
	},
});
