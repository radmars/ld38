"use strict";

LD38.Icon = me.Sprite.extend({
	init: function(x, key) {
		console.log(key);
		this._super(me.Sprite, 'init', [x, 167, {image: `icon_${key}`}]);
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		return true;
	},

});

LD38.Note = me.Sprite.extend({
	init: function(settings) {
		settings.sprite.anchorPoint = settings.sprite.anchorPoint
			|| new me.Vector2d(.5, .5);
		this._super(me.Sprite, 'init', [settings.x, settings.y, settings.sprite]);
		this.key = settings.key;
		this.slackTime = 150;

		this.shotTimerMax = this.shotTimer = 600 + Math.round(Math.random()*800);
		this.shotType = "tank";
		this.doesShoot = true;
		this.shotOffsetX = 0;
		this.shotOffsetY = 0;
		this.active = false;
	},

	addIcon: function() {
		if(this.icon == null ){
			if(this.key != 'start') {
				this.icon = me.pool.pull('Icon', this.pos.x, this.key);
			}else{
				this.icon = me.pool.pull('Icon', this.pos.x, "shift");
			}
			me.game.world.addChild(this.icon, 1000);
		}
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

		if(this.doesShoot){
			this.shotTimer -= dt;
			if (this.shotTimer <= 0) {
				this.shotTimer = this.shotTimerMax;
				this.shoot();
			}
		}

		return true;
	},

	shoot: function() {

		this.setCurrentAnimation('shoot', () => {
			this.setCurrentAnimation('idle');
		});
		var shot = me.pool.pull('Bullet', {x:this.pos.x + this.shotOffsetX, y:this.pos.y + this.shotOffsetY, type:this.shotType});
		me.game.world.addChild(shot);
	},

	removeIcon: function() {
		if(this.icon) {
			me.game.world.removeChild(this.icon);
		}
	},

	hit: function() {
		var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "explode_32");
		me.game.world.addChild(explosion, 1000);
	},
});

