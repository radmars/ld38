"use strict";

LD38.Hoop = LD38.Note.extend({

	init: function(x) {

		this.iconOffsetX = -15;
		this.iconOffsetY = -45;

		this._super(LD38.Note, 'init', [{
			x: x,
			y: 90,
			key: "right",
			sprite: {
				image: "hoop",
			},
		}]);

		this.doesShoot = false;
	},

	hit: function() {
		me.game.viewport.shake(4,750,me.game.viewport.AXIS.BOTH);
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "explode_big_64");
		me.game.world.addChild(explosion);
	},
});
