"use strict";

LD38.Tank = LD38.Note.extend({
	init: function(x) {
		this._super(LD38.Note, 'init', [{
			x: x,
			y: 120,
			key: "down",
			sprite: {
				image: "tank",
				framewidth: 48,
				frameheight: 48,
			},
		}]);

		this.addAnimation('idle', [0, 1, 2]);
		this.addAnimation('shoot', [3, 4, 5, 6, 7]);
		this.setCurrentAnimation('idle');
	},
});
