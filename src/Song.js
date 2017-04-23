"use strict";

(function() {
	var noteBuilders = [
		(x) => {return new LD38.Chopper(x)},
		(x) => {return new LD38.Tank(x)},
		(x) => {return new LD38.Hoop(x)},
		(x) => {return new LD38.Robot(x)},
	];

	LD38.Song = me.Renderable.extend({
		init: function(settings) {
			this._super(
				me.Renderable,
				'init',
				[0, 0, 10, 10]
			);

			var noteMap = settings.notes;
			var bpm     = settings.bpm;

			this.file      = settings.file;
			this.progress  = 0;
			this.floating  = true;
			this.msPerTick = 60 / (4 * bpm) * 1000;
			this.pxPerTick = settings.spacing
			this.pxPerMs   = this.pxPerTick / this.msPerTick;
			this.notes     = [];
			this.started   = false;

			Object.keys(noteMap).forEach((tick) => {
				this.addNote(tick, noteMap[tick]);
			});
		},

		addNote: function(tick, noteNum) {
			tick = tick - 1;
			var x = this.pxPerTick * tick
			var note = noteBuilders[noteNum](x);
			note.tick = tick;
			me.game.world.addChild(note);
			this.notes.push(note);
		},

		update: function(dt) {
			if(!this.started) {
				this.started = true;
				me.audio.playTrack(this.file)
			}

			this.progress += dt
			this.targetX = this.progress * this.pxPerMs;
			var inputs = ['start', 'up', 'down', 'left', 'right'];
			inputs.forEach((key) => {
				// TODO: input throttle
				if(me.input.isKeyPressed(key)) {
					if(this.notes[0].key == key) {
						var note = this.notes.shift();
						me.game.world.removeChild(note);
					}
				}
			});
		}
	});

	LD38.Song.one = () => new LD38.Song({
		bpm: 115,
		file: "drumtest",
		spacing: 15,
		notes: {
			// ITS ONE BASED OK??
			0  : 0,
			4  : 0,
			8 : 0,
			12 : 0,

			16 : 1,
			20 : 1,
			24 : 1,
			28 : 1,

			32 : 1,
			36 : 1,
			40 : 1,
			44 : 1,

			48 : 1,
			50 : 2,
			52 : 1,
			56 : 1,
			60 : 1,

			64 : 1,
			66 : 2,
			68 : 1,
			72 : 1,
			76 : 1,
		},
	});
})();
