"use strict"

LD38.HPDisplay = me.Renderable.extend({
	init : function (settings) {
		this.font = new me.Font('Times New Roman', 30, 'white');
		var size = this.font.measureText(me.video.renderer, 'HP: 0');
		this._super(
			me.Renderable,
			'init',
			[
				0, me.video.renderer.getHeight() - size.height + 1,
				size.width - 10, size.height - 1
			]
		);
		this.floating = true;
		this.pos.z = 20;
		this.hp = 9; // Placeholder - need to tie this to player HP.
		this.HPSubscription = me.event.subscribe('hp change', (player) => (this.updateHP(player)));
	},

	updateHP: function(player) {
		var old = this.hp;
		this.hp = player.hp;
		this.dirty = this.hp != old;
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
		this.font.draw(renderer, 'HP: ' + this.hp, this.pos.x - 1, this.pos.y);
		//renderer.restore();
	},

	update : function (dt) {
		return this.dirty;
	},
});
