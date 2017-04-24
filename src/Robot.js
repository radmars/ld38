"use strict";

LD38.Robot = LD38.Note.extend({
	init: function(x) {
		this._super(LD38.Note, 'init', [{
			x: x,
			y: 110,
			key: "left",
			sprite: {
				image: "robot",
				framewidth: 64,
				frameheight: 64,
			},
		}]);

		this.addAnimation('idle', [0, 1, 2, 3]);
		//this.addAnimation('shoot', [4, 5]);
		this.setCurrentAnimation('idle');
	},

	hit: function() {
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, true);
		me.game.world.addChild(explosion);
	},

});
