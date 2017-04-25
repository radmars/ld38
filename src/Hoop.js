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
		me.game.viewport.shake(6,500,me.game.viewport.AXIS.BOTH);
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y-60, "explode_big_64");
		me.game.world.addChild(explosion, 1000);
		me.audio.play("dunk", false, null, 0.9);

		var explosion = me.pool.pull('Particle', {x:this.pos.x-15, y:this.pos.y-50}, "particle_dunk_1", new me.Vector2d(-60,-4));
		me.game.world.addChild(explosion);
		var explosion = me.pool.pull('Particle', {x:this.pos.x, y:this.pos.y+20}, "particle_dunk_2", new me.Vector2d(-70,-25));
		me.game.world.addChild(explosion);
		var explosion = me.pool.pull('Particle', {x:this.pos.x, y:this.pos.y-30}, "particle_dunk_2", new me.Vector2d(-70,-25));
		me.game.world.addChild(explosion);
		var explosion = me.pool.pull('Particle', {x:this.pos.x, y:this.pos.y-60}, "particle_dunk_3", new me.Vector2d(50,7));
		me.game.world.addChild(explosion);
		var explosion = me.pool.pull('Particle', {x:this.pos.x+10, y:this.pos.y-60}, "particle_dunk_5", new me.Vector2d(80,-25));
		me.game.world.addChild(explosion);
		var explosion = me.pool.pull('Particle', {x:this.pos.x-10, y:this.pos.y-60}, "particle_dunk_4", new me.Vector2d(150,-30));
		me.game.world.addChild(explosion, 1000);

		this.randomDebris(4);

	},
});
