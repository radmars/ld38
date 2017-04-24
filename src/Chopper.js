"use strict";

LD38.Chopper = LD38.Note.extend({
	init: function(x) {

		this.iconOffsetX = 0;
		this.iconOffsetY = -20;

		this._super(LD38.Note, 'init', [{
			x: x,
			y: 70,
			key: "up",
			sprite: {
				image: "chopper",
				framewidth: 48,
				frameheight: 48,
			},
		}]);
		this.addAnimation('idle', [0, 1, 2, 3, 4, 5]);
		this.addAnimation('shoot', [6, 7, 8]);
		this.setCurrentAnimation('idle');
		this.shotType = "chopper";

		this.shotOffsetX = -10;
		this.shotOffsetY = 10;
	},

	hit: function() {
		me.game.viewport.shake(2,250,me.game.viewport.AXIS.BOTH);
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "explode_32");
		me.game.world.addChild(explosion, 1000);
		me.audio.play("heliexplode", false, null, 0.9);
		this.randomDebris(Math.round(1 + Math.random()*1));
	},
});
