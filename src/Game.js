"use strict";
var LD38 = {};

LD38.Game = class {
	constructor() {
		this.screenHeight = 180;
		this.screenWidth = 320;
		this.options = {};

		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m,key,value) => {
			this.options[key] = value;
		});
	}

	start() {
		if(
			!me.video.init( this.screenWidth, this.screenHeight, {
				wrapper: "screen",
				scale: this.options.scale || 'auto',
				scaleMethod: 'fit',
			})
		) {
			alert("This game is too cool for your browser, try a different one!");
		}

		me.audio.init("m4a,ogg");

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

		me.loader.preload(this.resources(), this.onLoad.bind(this));
		me.state.change(LD38.Game.States.Loading);
	}



	image(name) {
		return {
			name : name,
			type : "image",
			src  : `data/${name}.png`,
		}
	}

	resources() {
		return [
			this.image("bg0"),
			this.image("bg1"),
			this.image("chopper"),
			this.image("comp"),
			this.image("ground"),
			this.image("hoops"),
			this.image("kaiju"),
			this.image("man"),
			this.image("robot"),
			this.image("tank"),
		];
	}

	onLoad() {
		// Register melon entities
		[
			'Chopper',
			'Hoop',
			'Kaiju',
			'Man',
			'Tank',
		].forEach((type) => {
			me.pool.register(type, LD38[type], true);
		});

		me.state.change(LD38.Game.States.Play);
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

