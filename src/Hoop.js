"use strict";

LD38.Hoop = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, {
			image: "hoops",
		}]);
	},
	update: function() {
		return true;
	},
});
