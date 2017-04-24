"use strict";

LD38.Robot = LD38.Note.extend({
	init: function(x) {

		this.iconOffsetX = -3;
		this.iconOffsetY = -34;

		this._super(LD38.Note, 'init', [{
			x: x,
			y: 105,
			key: "left",
			sprite: {
				image: "robot",
				framewidth: 64,
				frameheight: 64,
			},
		}]);

		this.addAnimation('idle', [0, 1, 2, 3]);
		this.addAnimation('shoot', [0, 1, 2, 3]);
		this.setCurrentAnimation('idle');
		this.doesShoot = false;
	},

	hit: function() {
		me.game.viewport.shake(4,400,me.game.viewport.AXIS.BOTH);
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "explode_big_64");
		me.game.world.addChild(explosion);
		me.audio.play("robotexplode", false, null, 0.75);
		this.randomDebris(Math.round(3 + Math.random()*2));
	},

});
