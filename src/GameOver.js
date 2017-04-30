"use strict"

LD38.GameOverScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', []);
		this.finished = false;
	},

	onResetEvent: function() {
		this.radmars = new LD38.BGRenderable("game_over");
		me.game.world.addChild( this.radmars );
		this.hitenter = new LD38.HitEnter();
		me.game.world.addChild(this.hitenter);
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		me.audio.play( "gameover" );
		this.finished = false;
	},

	keyHandler: function (action, keyCode, edge) {
		if(keyCode === me.input.KEY.ENTER && !this.finished) {
			me.state.change(LD38.Game.States.Title);
			me.audio.fade("gameover", 1.0, 0.0, 1000);
			this.finished = true;
		}
	},

	onDestroyEvent: function() {
		me.event.unsubscribe(this.subscription);
	}
});
