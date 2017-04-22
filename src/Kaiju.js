"use strict";

LD38.Kaiju = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, {
			image: "kaiju",
		}]);
	},
	update: function() {
		return true;
	},
});
