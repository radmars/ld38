"use strict"

LD38.Explosion = me.Sprite.extend({
	init: function(x, y, type) {
		var sizeX = 32;
		var sizeY = 32;
		var t = type || "explode_32";
		switch( t ) {
			case "bloodsplat":
				sizeX = sizeY = 16;
				break;
			case "firesmoke":
				sizeX = sizeY = 16;
				break;
			case "explode_32":
				sizeX = sizeY = 32;
				break;
			case "explode_big_64":
				sizeX = sizeY = 64;
				break;
			case "great":
				sizeX = 25;
				sizeY = 7;
				break;
			case "miss":
				sizeX = 17;
				sizeY = 7;
				break;
		}

		this._super(me.Sprite, 'init', [x, y, {
			image: type,
			framewidth: sizeX,
			frameheight: sizeY,
		}]);
        this.alwaysUpdate = true;

		switch( t ) {
			case "firesmoke":
				this.addAnimation('idle', [0, 1, 2, 3, 4, 5, 6]);
				this.addAnimation('dead', [6]);
				break;
			case "bloodsplat":
				this.addAnimation('idle', [0, 1, 2, 3, 4, 5, 6, 7]);
				this.addAnimation('dead', [7]);
				break;
			case "explode_32":
				this.addAnimation('idle', [0, 1, 2, 3, 4, 5, 6, 7]);
				this.addAnimation('dead', [7]);
				break;
			case "explode_big_64":
				this.addAnimation('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
				this.addAnimation('dead', [9]);
				break;
			case "great":
				this.addAnimation('idle', [0, 1, 2, 3, 4, 5, 6]);
				this.addAnimation('dead', [6]);
				break;
			case "miss":
				this.addAnimation('idle', [0, 1, 2, 3, 4, 5, 6]);
				this.addAnimation('dead', [6]);
				break;
		}
		this.life = 1000;
		this.setCurrentAnimation('idle', () => {
		this.setCurrentAnimation('dead');
			me.game.world.removeChild(this);
		});
	},

	update: function(dt) {
		this.life -=dt;
		if(this.life <= 0 ) {
			this.die();
			return;
		}
		this._super(me.Sprite, 'update', [dt]);

		return true;
	},
	die: function() {
		me.game.world.removeChild(this);
	},
});
