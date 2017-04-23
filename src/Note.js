"use strict";

LD38.Note = me.Sprite.extend({
	init: function(settings) {
		this._super(me.Sprite, 'init', [settings.x, settings.y, settings.sprite]);
		this.key = settings.key;
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		return true;
	},
});

