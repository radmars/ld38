"use strict"

LD38.GameOverScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', []);
		this.finished = false;
	},

	onResetEvent: function() {
		this.radmars = new LD38.GameOverRenderable();
		me.game.world.addChild( this.radmars );
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		me.audio.playTrack( "gameover" );
		console.log("reset");
	},

	keyHandler: function (action, keyCode, edge) {
		if(keyCode === me.input.KEY.ENTER && !this.finished) {
			me.state.change(LD38.Game.States.Title);
			me.audio.fade("gameover", 1.0, 0.0, 1000);
			this.finished = true;
		}
	},

	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.event.unsubscribe(this.subscription);
	}
});

LD38.GameOverRenderable = me.Renderable.extend({
	init: function() {
		this._super(me.Renderable, "init", [0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()] );
		this.counter = 0;
		this.floating = true;

		// center of hit enter 12 px from bottom
		var cx = this.width / 2;
		var cy = this.height / 2;
		this.bg = new me.Sprite(0, 0, { image: "game_over" });
		this.bg.pos.x = cx;
		this.bg.pos.y = cy;
		this.alpha = 0;
		this.hitEnter = new me.Sprite(cx, this.height - 12, {image: "hit_enter"});
	},

	draw: function(context) {
		this.bg.draw(context);
		this.hitEnter.draw(context);
	},

	update: function( dt ) {
		this.counter += dt;
		if ( this.counter > 500 ) {
			this.hitEnter.alpha = 1 - this.hitEnter.alpha;
			this.counter = 0;
		}
		return true;
	}
});
