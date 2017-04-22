"use strict";
var LD38 = {};

LD38.Game = class {
	constructor() {
		this.screenHeight = 640;
		this.screenWidth = 960;
		this.options = {};
	}

	start() {
		if(
			!me.video.init( this.screenWidth, this.screenHeight, {
				wrapper: null,
				scale: this.options.scale || 'auto',
				scaleMethod: 'fit',
			})
		) {
			alert("This game is too cool for your browser, try a different one!");
		}

		me.audio.init("m4a,ogg");

		me.loader.preload(this.resources(), this.onLoad.bind(this));
	}

	resources() {
		return [];
	}

	onLoad() {
		// Set up our screen states
		Object.keys(LD38.Game.States).forEach((name) => {
			var className = name + "Screen"
			var classDefinition = LD38[className];
			if(!classDefinition) {
				console.warn(`FYI: You have no definition for ${name} screen.`);
			}
			else {
				me.state.set(
					LD38.Game.States[name],
					new (Function.prototype.bind.call(classDefinition))()
				);
			}
		});

		// Register melon entities
		[
		].forEach((type) => {
			me.pool.register(type, LD38[type], true);
		});
	}
};

LD38.Game.States = {
	Loading:  0 + me.state.USER,
	Intro:    1 + me.state.USER,
	Play:     2 + me.state.USER,
	Title:    3 + me.state.USER,
	Controls: 4 + me.state.USER,
	Credits:  5 + me.state.USER,
	Win:      6 + me.state.USER,
	GameOver: 7 + me.state.USER,
}

var game = new LD38.Game();

// Bind the game to the dom.
window.onReady(game.start.bind(game));

