"use strict";

LD38.Kaiju = me.Sprite.extend({
	init: function(song) {
		this._super(me.Sprite, 'init', [0, 100, {
			image: "kaiju",
			anchorPoint: new me.Vector2d(1, .5),
			framewidth: 136,
			frameheight: 92,
		}]);
		this.song = song;
		this.addAnimation('idle', [0, 1, 2, 3, 4]);
		this.addAnimation('dribble', [5,6,7,8,9]);
		this.setCurrentAnimation('dribble');
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		this.pos.x = ~~(this.song.targetX);
		return true;
	},
});
