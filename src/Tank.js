"use strict";

LD38.Tank = LD38.Note.extend({
	init: function(x) {

		this.iconOffsetX = 0;
		this.iconOffsetY = -15;

		this._super(LD38.Note, 'init', [{
			x: x,
			y: 115,
			key: "down",
			sprite: {
				image: "tank",
				framewidth: 48,
				frameheight: 48,
			},
		}]);

		this.addAnimation('idle', [0, 1, 2]);
		this.addAnimation('shoot', [3,3, 4, 5, 6, 7]);
		this.setCurrentAnimation('idle');

		this.shotOffsetX = -7;
		this.shotOffsetY = 0;
	},

	hit: function() {
		me.game.viewport.shake(3,300,me.game.viewport.AXIS.BOTH);
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y+10, "explode_32");
		me.game.world.addChild(explosion, 1000);
		me.audio.play("tankexplode", false, null, 0.75);

		this.randomDebris(Math.round(1 + Math.random()*1));
	},
});
