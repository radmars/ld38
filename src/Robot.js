"use strict";

LD38.Robot = LD38.Note.extend({
	init: function(x) {
		this._super(LD38.Note, 'init', [{
			x: x,
			y: 110,
			key: "left",
			sprite: {
				image: "robot",
				framewidth: 64,
				frameheight: 64,
			},
		}]);
	},
});
