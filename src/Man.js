"use strict";

LD38.Man = LD38.Note.extend({
	init: function(x, y, settings) {
		this._super(LD38.Note, 'init', [{
			x: x,
			y: 125,
			key: "start",
			sprite: {
				image: "man",
				framewidth: 24,
				frameheight: 24,
			},
		}]);
		this.addAnimation('idle', [0, 1, 2, 3, 4, 5]);
		this.setCurrentAnimation('idle');
	},
});
