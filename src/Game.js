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
				keys: [me.input.KEY.ENTER, me.input.KEY.X],
				pad:  [me.input.GAMEPAD.BUTTONS.FACE_3, me.input.GAMEPAD.BUTTONS.START],
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
			this.audio("ld38-level2"),
			this.audio("ld38-level3"),
			this.audio("ld38-title"),
			this.audio("gameover"),
			this.audio("win"),

			this.audio("dribble"),
			this.audio("dunk"),
			this.audio("heliexplode"),
			this.audio("hit"),
			this.audio("robotexplode"),
			this.audio("shoot"),
			this.audio("squish"),
			this.audio("step"),
			this.audio("tankexplode"),
			this.audio("jump"),
			this.audio("death"),

			this.image("title"),
			this.image("win"),
			this.image("game_over"),
			this.image("hit_enter"),
			this.image("icon_box"),
			this.image("icon_down"),
			this.image("icon_up"),
			this.image("icon_right"),
			this.image("icon_left"),
			this.image("icon_shift"),
			this.image("icon_x"),
			this.image("bottom_hud_bg"),
			this.image("level_1_bg"),
			this.image("level_1_fg_1"),
			this.image("level_1_fg_2"),
			this.image("level_1_mg"),
			this.image("level_2_bg"),
			this.image("level_2_fg_1"),
			this.image("level_2_fg_2"),
			this.image("level_2_mg"),
			this.image("level_3_bg"),
			this.image("level_3_fg_1"),
			this.image("level_3_fg_2"),
			this.image("level_3_mg"),
			this.image("level_select_bg"),
			this.image("level_select_level_1"),
			this.image("level_select_level_2"),
			this.image("level_select_level_3"),
			this.image("level_select_selector"),
			this.image("chopper"),
			this.image("comp"),
			this.image("ground"),
			this.image("ground2"),
			this.image("hoop"),
			this.image("kaiju"),
			this.image("man"),
			this.image("robot"),
			this.image("tank"),
			this.image("explode_big_64"),
			this.image("explode_32"),

			this.image("bullet_tank"),
			this.image("bullet_man"),
			this.image("bullet_chopper"),
			this.image('bloodsplat'),
			this.image('firesmoke'),
			this.image('beat_line'),

			this.image('particle_dunk_1'),
			this.image('particle_dunk_2'),
			this.image('particle_dunk_3'),
			this.image('particle_dunk_4'),
			this.image('particle_dunk_5'),

			this.image('debris_1'),
			this.image('debris_2'),
			this.image('debris_3'),
			this.image('debris_4'),

			this.image('great'),
			this.image('miss'),
			this.image('hp_back'),
			this.image('hp_bar'),
			this.image('hp_frame'),

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
			'Explosion',
			'Icon',
			'Bullet',
			'Particle'
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
	Win:      6 + me.state.USER,
	GameOver: 7 + me.state.USER,
	Level:    8 + me.state.USER,
}

var game = new LD38.Game();

// Bind the game to the dom.
window.onReady(game.start.bind(game));

