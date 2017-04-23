"use strict";

LD38.Man = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, {
			image: "man",
			framewidth: 24,
			frameheight: 24,
		}]);
		this.addAnimation('idle', [0, 1, 2, 3, 4, 5]);
		this.setCurrentAnimation('idle');
	},
	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		return true;
	},
});
