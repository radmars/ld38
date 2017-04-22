"use strict";

LD38.Chopper = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, {
			image: "chopper",
		}]);
	},
	update: function() {
		return true;
	},
});
