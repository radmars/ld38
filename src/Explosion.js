"use strict"

LD38.Explosion = me.Sprite.extend({
	init: function(x, y, big) {
		var size = big ? 64: 32;
		this._super(me.Sprite, 'init', [x, y, {
			image: big ? "explode_big_64" : 'explode_32',
			framewidth: size,
			frameheight: size,
		}]);
		this.addAnimation('idle', [0, 1, 2, 3, 4, 5, 6, 7]);
		this.addAnimation('dead', [7]);
		this.setCurrentAnimation('idle', () => {
		this.setCurrentAnimation('dead');
			me.game.world.removeChild(this);
		});
	},
});
