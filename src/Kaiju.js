"use strict";

LD38.Kaiju = me.Sprite.extend({
	init: function(song) {
		this._super(me.Sprite, 'init', [0, 100, {
			image: "kaiju",
			anchorPoint: new me.Vector2d(.85, .5),
			framewidth: 136,
			frameheight: 92,
		}]);
		this.song = song;
		this.addAnimation('idle', [0, 1, 2, 3, 4]);
		this.addAnimation('dribble', [5,6,7,8,9]);
		this.setCurrentAnimation('dribble');
		this.trackingPos = this.pos.clone();
		this.icon = me.pool.pull("Icon", 1, 167, 'box');
		me.game.world.addChild(this.icon);
		var hud = new me.Sprite(160, 167, {
			image: 'bottom_hud_bg',
		});
		//hud.pos.z = -10;
		hud.floating = true;
		me.game.world.addChild(hud, 2);
		me.game.world.autoSort = true;
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		this.pos.x = ~~(this.song.targetX);
		this.icon.pos.x = this.pos.x;
		this.trackingPos.x = ~~(this.song.targetX + 40);
		return true;
	},

	draw: function(renderer) {
		this._super(me.Sprite, 'draw', [renderer]);

		if(game.options.debug) {
			renderer.setColor(new me.Color(255, 0, 0, .5));
			renderer.fillRect(this.pos.x - 1, this.pos.y - 20, 2, 40);
		}
	},

});
