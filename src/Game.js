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

		if(this.options.mute) {
			me.audio.muteAll();
		}

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

		this.bindInput();

		me.loader.preload(this.resources(), this.onLoad.bind(this));
		me.state.change(LD38.Game.States.Loading);
	}

	bindInput() {
		var inputs = {
			left:  {
				keys: [me.input.KEY.LEFT, me.input.KEY.A],
				pad:  [me.input.GAMEPAD.BUTTONS.LEFT],
			},
			right: {
				keys: [me.input.KEY.RIGHT, me.input.KEY.D],
				pad:  [me.input.GAMEPAD.BUTTONS.RIGHT],
			},
			up: {
				keys: [me.input.KEY.UP, me.input.KEY.W],
				pad:  [me.input.GAMEPAD.BUTTONS.UP],
			},
			down: {
				keys: [me.input.KEY.DOWN, me.input.KEY.S],
				pad:  [me.input.GAMEPAD.BUTTONS.DOWN],
			},
			start: {
				keys: [me.input.KEY.ENTER, me.input.KEY.SHIFT],
				pad:  [me.input.GAMEPAD.BUTTONS.DOWN],
			},
		};

		Object.keys(inputs).forEach(function(k) {
			inputs[k].keys.forEach(function(code) {
				me.input.bindKey(code, k, true);
			})
			if(me.input.GAMEPAD) {
				inputs[k].pad.forEach(function(code) {
					me.input.bindGamepad(
						0,
						{
							type: 'buttons',
							code: code,
						},
						inputs[k].keys[0]
					);
				});
			}
		});
	}

	image(name) {
		return {
			name : name,
			type : "image",
			src  : `data/${name}.png`,
		}
	}

	audio(name) {
		return {
			name: name,
			type: "audio",
			src: "data/audio/",
			channels: 2,
		};
	}

	resources() {
		return [
			this.audio("drumtest"),
			this.audio("ld38-level1"),
			this.image("bg0"),
			this.image("bg1_1"),
			this.image("bg1_2"),
			this.image("chopper"),
			this.image("comp"),
			this.image("ground"),
			this.image("ground2"),
			this.image("hoops"),
			this.image("kaiju"),
			this.image("man"),
			this.image("robot"),
			this.image("tank"),

			this.audio('radmarslogo'),
			this.image('intro_bg'),
			this.image('intro_glasses1'),
			this.image('intro_glasses2'),
			this.image('intro_glasses3'),
			this.image('intro_glasses4'),
			this.image('intro_mars'),
			this.image('intro_radmars1'),
			this.image('intro_radmars2'),
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
			'Robot',
		].forEach((type) => {
			me.pool.register(type, LD38[type], true);
		});

		me.state.transition('fade', '#000', 1000);
		me.state.change(
			game.options.skipIntro
				? LD38.Game.States.Play
				: LD38.Game.States.Intro
		);
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

