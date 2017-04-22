"use strict"

LD38.PlayScreen = me.ScreenObject.extend({
	add: function(item) {
		me.game.world.addChild(item);
		this.entities.push(item);
	},

	onResetEvent: function() {
		this.entities = [];
		this.add(new LD38.BGColor());
		this.add(new me.Sprite(0, 0, {
			image: "bg0",
			doubleBuffering: true,
			anchorPoint: new me.Vector2d(0, 0),
		}));

		this.add(new me.Sprite(0, 0, {
			image: "bg1",
			doubleBuffering: true,
			anchorPoint: new me.Vector2d(0, 0),
		}));

		this.add(new me.Sprite(0, 130, {
			image: "ground",
			doubleBuffering: true,
			anchorPoint: new me.Vector2d(0, 0),
		}));

		// TODO: Use pool.
		this.add(me.pool.pull('Kaiju', 80, 100));
		this.add(me.pool.pull('Man', 130, 125));
		this.add(me.pool.pull('Hoop', 300, 75));
		this.add(me.pool.pull('Chopper', 230, 40));
		this.add(me.pool.pull('Tank', 200, 125));
	},

	onDestroyEvent: function() {
		this.entities.forEach((item) => {
			me.game.world.removeChild(item);
		});
		me.audio.stopTrack();
	},
});
