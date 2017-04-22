"use strict";

LD38.Tank = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, {
			image: "tank",
		}]);
	},
	update: function() {
		return true;
	},
});
