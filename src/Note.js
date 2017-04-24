"use strict";

LD38.Note = me.Sprite.extend({
	init: function(settings) {
		settings.sprite.anchorPoint = settings.sprite.anchorPoint
			|| new me.Vector2d(.5, .5);
		this._super(me.Sprite, 'init', [settings.x, settings.y, settings.sprite]);
		this.key = settings.key;
		this.slackTime = 150;
	},

	setTiming: function(tick, perfectTime) {
		this.tick = tick;
		this.time = perfectTime;
	},

	isCorrectKey: function(key) {
		return key == this.key;
	},

	isLate: function(now) {
		return this.time + this.slackTime < now;
	},

	isEarly: function(now) {
		return this.time - this.slackTime > now;
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		return true;
	},

	hit: function() {
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, false);
		me.game.world.addChild(explosion);
	},
});

