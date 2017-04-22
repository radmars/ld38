"use strict";

LD38.Kaiju = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, {
			image: "kaiju",
		}]);
		this.progress = 0;
	},

	update: function(dt) {
		this.progress += dt / 1000;
		this.pos.x = ~~(this.pos.x + dt / 10);
		return true;
	},
});
