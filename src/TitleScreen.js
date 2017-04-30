"use strict"

LD38.TitleScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', []);
		this.finished = false;
	},

	onResetEvent: function() {
		this.radmars = new LD38.BGRenderable("title");
		me.game.world.addChild( this.radmars );
		this.hitenter = new LD38.HitEnter();
		me.game.world.addChild(this.hitenter);
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		me.audio.play( "ld38-title" );
		this.finished = false;
	},

	keyHandler: function (action, keyCode, edge) {
		if(keyCode === me.input.KEY.ENTER && !this.finished) {
			me.state.change(LD38.Game.States.Level);
			me.audio.fade("ld38-title", 1.0, 0.0, 1000);
			this.finished = true;
		}
	},

	onDestroyEvent: function() {
		me.event.unsubscribe(this.subscription);
	}
});
