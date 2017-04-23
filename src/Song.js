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
			console.log(`${x} note on tick ${tick}`);
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
		bpm: 120,
		file: "drumtest",
		spacing: 15,
		notes: {
			// ITS ONE BASED OK??
			3  : 0,
			7  : 0,
			11 : 0,
			15 : 0,

			19 : 1,
			23 : 1,
			27 : 1,
			31 : 1,

			35 : 1,
			39 : 1,
			43 : 1,
			47 : 1,

			51 : 1,
			53 : 2,
			55 : 1,
			59 : 1,
			63 : 1,

			67 : 1,
			69 : 2,
			71 : 1,
			75 : 1,
			79 : 1,
		},
	});
})();
