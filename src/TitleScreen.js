"use strict"

LD38.TitleScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', []);
		this.finished = false;
	},

	onResetEvent: function() {
		this.radmars = new LD38.TitleRenderable();
		me.game.world.addChild( this.radmars );
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		me.audio.play( "ld38-title" );
		this.finished = false;
	},

	keyHandler: function (action, keyCode, edge) {
		if(keyCode === me.input.KEY.ENTER && !this.finished) {
			me.state.change(LD38.Game.States.Play);
			me.audio.fade("ld38-title", 1.0, 0.0, 1000);
			this.finished = true;
		}
	},

	onDestroyEvent: function() {
		me.event.unsubscribe(this.subscription);
	}
});

LD38.TitleRenderable = me.Renderable.extend({
	init: function() {
		this._super(me.Renderable, "init", [0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()] );
		this.counter = 0;
		this.floating = true;

		// center of hit enter 12 px from bottom
		var cx = this.width / 2;
		var cy = this.height / 2;
		this.bg = new me.Sprite(0, 0, { image: "title" });
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
