"use strict";

LD38.Note = me.Sprite.extend({
	init: function(settings) {
		settings.sprite.anchorPoint = settings.sprite.anchorPoint
			|| new me.Vector2d(.5, .5);
		this._super(me.Sprite, 'init', [settings.x, settings.y, settings.sprite]);
		this.key = settings.key;
		this.slackTime = 150;
	},

	draw: function(renderer) {
		this._super(me.Sprite, 'draw', [renderer]);

		if(game.options.debug) {
			renderer.setColor(new me.Color(255, 255, 0, .5));
			renderer.fillRect(this.pos.x - 1, this.pos.y - 20, 2, 40);
			renderer.setColor(new me.Color(0, 255, 0, .5));
			var off = this.slackTime * this.pxPerMs;
			renderer.fillRect(this.pos.x - off, this.pos.y - 1, off * 2, 2);
		}
	},

	setTiming: function(tick, perfectTime, pxPerMs) {
		this.tick = tick;
		this.time = perfectTime;
		this.pxPerMs = pxPerMs
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

