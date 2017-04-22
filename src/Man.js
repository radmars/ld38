"use strict";

LD38.Man = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, {
			image: "man",
		}]);
	},
	update: function() {
		return true;
	},
});
