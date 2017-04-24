"use strict"

LD38.Explosion = me.Sprite.extend({
	init: function(x, y, type) {
		var size = 32;
		var t = type || "explode_32";
		switch( t ) {
			case "bloodsplat":
				size = 16;
				break;
			case "firesmoke":
				size = 16;
				break;
			case "explode_32":
				size = 32;
				break;
			case "explode_big_64":
				size = 64;
				break;
		}

		this._super(me.Sprite, 'init', [x, y, {
			image: type,
			framewidth: size,
			frameheight: size,
		}]);

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
		}


		this.setCurrentAnimation('idle', () => {
		this.setCurrentAnimation('dead');
			me.game.world.removeChild(this);
		});
	},
});
