"use strict";

LD38.Kaiju = me.Sprite.extend({
	init: function(song) {
		this._super(me.Sprite, 'init', [0, 100, {
			image: "kaiju",
			anchorPoint: new me.Vector2d(1, .5),
		}]);
		this.song = song;
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		this.pos.x = ~~(this.song.targetX);
		return true;
	},
});
