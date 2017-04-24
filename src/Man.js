"use strict";

LD38.Man = LD38.Note.extend({
	init: function(x, y, settings) {

		this.iconOffsetX = 0;
		this.iconOffsetY = -15;

		this._super(LD38.Note, 'init', [{
			x: x,
			y: 125,
			key: "start",
			sprite: {
				image: "man",
				framewidth: 24,
				frameheight: 24,
			},
		}]);
		this.addAnimation('idle', [0, 1, 2, 3]);
		this.addAnimation('shoot', [4,5,4,5]);
		this.setCurrentAnimation('idle');
		this.shotType = "man";
	},

	hit: function() {
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "bloodsplat");
		me.game.world.addChild(explosion);
		me.audio.play("dribble", false, null, 0.5);
		me.audio.play("squish");
	},
});
