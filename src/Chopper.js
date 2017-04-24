"use strict";

LD38.Chopper = LD38.Note.extend({
	init: function(x) {
		this._super(LD38.Note, 'init', [{
			x: x,
			y: 70,
			key: "up",
			sprite: {
				image: "chopper",
				framewidth: 48,
				frameheight: 48,
			},
		}]);
		this.addAnimation('idle', [0, 1, 2, 3, 4, 5]);
		this.addAnimation('shoot', [6, 7, 8]);
		this.setCurrentAnimation('idle');
	},
});
