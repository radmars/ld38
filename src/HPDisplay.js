"use strict"

LD38.HPDisplay = me.Renderable.extend({
	init : function (initial_hp) {
		this.font = new me.Font('Times New Roman', 30, 'white');
		var size = this.font.measureText(me.video.renderer, 'HP: 0');
		this._super(
			me.Renderable,
			'init',
			[
				0, 0,
				size.width - 10, size.height - 1
			]
		);
		this.floating = true;
		this.pos.z = 1000;
		this.hp = this.hpMax = initial_hp;
		this.HPSubscription = me.event.subscribe('hp change', (hp) => (this.updateHP(hp)));

		this. back = new me.Sprite(25, 9, {
			image: "hp_back",
			anchorPoint: new me.Vector2d(0, 0),
		});
		this. bar = new me.Sprite(28, 10, {
			image: "hp_bar",
			anchorPoint: new me.Vector2d(0, 0),
		});
		this. frame = new me.Sprite(0, 0, {
			image: "hp_frame",
			anchorPoint: new me.Vector2d(0, 0),
		});
	},

	updateHP: function(hp) {
		if (this.hp != hp) {
			this.hp = hp;
			this.dirty = 1;

			this.bar.pos.x = 28 - Math.round(45* (1- this.hp / (this.hpMax)));
		}
	},

	onDeactivateEvent: function() {
		me.event.unsubscribe(this.HPSubscription);
	},

	draw: function(renderer) {
		this.dirty = false;
		var screenWidth = renderer.getWidth();
		var screenHeight = renderer.getHeight();
		//renderer.save();
		//renderer.setColor(LD38.black);
		//renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
		//this.font.draw(renderer, 'HP: ' + this.hp, this.pos.x - 1, this.pos.y);
		//renderer.restore();

		var displayHP = this.hp;
		if(displayHP > this.hpMax) displayHP = this.hp;
		if(displayHP < 0) displayHP = 0;

		this.back.draw(renderer);
		this.bar.draw(renderer);
		this.frame.draw(renderer);
	},

	update : function (dt) {
		return this.dirty;
	},
});
