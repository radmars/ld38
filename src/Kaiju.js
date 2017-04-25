"use strict";

LD38.Kaiju = me.Sprite.extend({
	init: function(song) {
		this._super(me.Sprite, 'init', [0, 77, {
			image: "kaiju",
			anchorPoint: new me.Vector2d(.85, .5),
			framewidth: 136,
			frameheight: 136,
		}]);
		this.song = song;
		this.addAnimation('idle', [0, 1, 2, 3, 4]);
		this.addAnimation('dribble', [6,7,8]) //5,6,7,8],9;
		this.addAnimation('hit', [10,4]);
		this.addAnimation('pre_dunk', [11,11]);
		this.addAnimation('dunk', [12,13,14,15,16]); //12,13,14,15,16
		this.addAnimation('choopper', [18,19,20]);  //17,18,19,20,21
		this.addAnimation('stomp', [22,23,24,25]) //22,23,24,25,26
		this.addAnimation('headbutt', [27,28,29,30,31]) //27,28,29,30,31;
		this.addAnimation('die', [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57]);
		this.addAnimation('die_idle', [57,57]);

		this.baseY = this.pos.y;
		this.preDunkY = this.pos.y-25;
		this.dunkTween = null;
		this.alive = true;

		this.setCurrentAnimation('idle');
		this.trackingPos = this.pos.clone();
		//this.icon = me.pool.pull("Icon", 1, 90, 'box');
		//me.game.world.addChild(this.icon);
		this.hud = new me.Sprite(120, 90, {
			image: 'beat_line',
			framewidth: 15,
			frameheight: 180,
		});
		this.hud.floating = true;
		me.game.world.addChild(this.hud, 15);
	},

	predunk: function() {

		if(!this.alive || this.isCurrentAnimation("hit") || this.isCurrentAnimation("pre_dunk")) {
			return;
		}
		this.setCurrentAnimation('pre_dunk');
		this.killTween();
		this.dunkTween = new me.Tween(this.pos).to({y: this.preDunkY}, 500).onComplete(this.killTween);
		this.dunkTween.start();
		me.audio.play("jump");
	},

	killTween: function() {
		if(this.dunkTween != null) {
			this.dunkTween.stop();
		}
	},

	returnToBaseY: function() {
		this.killTween();
		this.pos.y = this.baseY;
	},

	hit: function(type) {
		if(!this.alive) {
			return;
		}

		var anim = "dribble";

		switch( type){
			case "start": //man
				anim = "dribble";
				break;
			case "down": //tank
				anim = "stomp";
				break;
			case "up": //chopper
				anim = "choopper";
				break;
			case "right": //hoop
				anim = "dunk";
				break;
			case "left": //robot
				anim = "headbutt";
				break;
			default:
				anim = "dribble";
				break;
		}

		this.returnToBaseY();
		this.setCurrentAnimation(anim, () => {
			this.setCurrentAnimation('idle');
		});
	},

	miss: function() {
		if(!this.alive) {
			return;
		}
		this.returnToBaseY();
		this.setCurrentAnimation('hit', () => {
				this.setCurrentAnimation('idle');
		});
	},

	die: function(){
		this.returnToBaseY();
		this.setCurrentAnimation('die', () => {
			this.setCurrentAnimation('die_idle');
		});
		this.hud.pos.x = -1000;
		me.audio.play("death");
		me.game.viewport.shake(5,750,me.game.viewport.AXIS.BOTH);
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		this.pos.x = ~~(this.song.targetX);
		//this.icon.pos.x = this.pos.x;
		this.trackingPos.x = ~~(this.song.targetX + 40);
		return true;
	},

	draw: function(renderer) {
		this._super(me.Sprite, 'draw', [renderer]);

		if(game.options.debug) {
			renderer.setColor(new me.Color(255, 0, 0, .5));
			renderer.fillRect(this.pos.x - 1, this.pos.y - 20, 2, 40);
		}
	},

});
