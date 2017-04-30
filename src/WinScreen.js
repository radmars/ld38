"use strict"

LD38.WinScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', []);
		this.finished = false;
	},

	onResetEvent: function() {
		this.radmars = new LD38.BGRenderable("win");
		this.hitenter = new LD38.HitEnter();
		me.game.world.addChild( this.hitenter );
		me.game.world.addChild( this.radmars );
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		me.audio.play( "win" );
		this.finished = false;
	},

	keyHandler: function (action, keyCode, edge) {
		if(keyCode === me.input.KEY.ENTER && !this.finished) {
			me.state.change(LD38.Game.States.Title);
			me.audio.fade("win", 1.0, 0.0, 1000);
			this.finished = true;
		}
	},

	onDestroyEvent: function() {
		me.event.unsubscribe(this.subscription);
	}
});

LD38.HitEnter = me.Sprite.extend({
	init: function() {
		this._super(me.Sprite, "init", [
			me.video.renderer.getWidth() / 2,
			me.video.renderer.getHeight() - 12,
			{
				image: "hit_enter",
			}
		]);
		this.counter = 0;
	},
	update: function(dt) {
		this.counter += dt;
		if ( this.counter > 500 ) {
			this.alpha = 1 - this.alpha;
			this.counter = 0;
		}
		return true;
	},
});

LD38.BGRenderable = me.Sprite.extend({
	init: function(bg) {
		this._super(me.Sprite, "init", [
			me.video.renderer.getWidth() / 2,
			me.video.renderer.getHeight() / 2,
			{
				image: bg,
			},
		]);
	},
});
