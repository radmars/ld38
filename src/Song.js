"use strict";

(function() {
	var noteBuilders = [
		(x) => {return new LD38.Chopper(x)},
		(x) => {return new LD38.Tank(x)},
		(x) => {return new LD38.Hoop(x)},
		(x) => {return new LD38.Robot(x)},
	];

	var inputs = ['start', 'up', 'down', 'left', 'right'];

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
			this.delay     = settings.delay;

			Object.keys(noteMap).forEach((tick) => {
				this.addNote(tick, noteMap[tick]);
			});
		},

		addNote: function(tick, noteNum) {
			var x    = (tick * this.pxPerTick) + (this.delay * this.pxPerMs);
			var note = noteBuilders[noteNum](x);
			note.setTiming(tick, (tick * this.msPerTick) + (this.delay));

			me.game.world.addChild(note);
			this.notes.push(note);
		},

		update: function(dt) {
			if(!this.started && this.progress > this.delay) {
				this.started = true;
				me.audio.playTrack(this.file)
			}

			this.progress += dt
			this.targetX = this.progress * this.pxPerMs;
			var next = this.notes[0];
			if(!next) {
				return;
			}

			if(next.isLate(this.progress)) {
				this.notes.shift();
				console.log("late!");
			}

			inputs.forEach((key) => {
				if(me.input.isKeyPressed(key)) {
					if(!next.isCorrectKey(key)) {
						this.notes.shift();
						console.log("Wrong key!");
					}
					else if(next.isEarly(this.progress)) {
						console.log("Early!");
					}
					else {
						this.notes.shift();
						me.game.world.removeChild(next);
					}
				}
			});
		}
	});

	LD38.Song.one = () => new LD38.Song({
		bpm     : 115,
		delay   : 1500,
		file    : "drumtest",
		spacing : 15,
		notes   : {
			0  : 0,
			4  : 0,
			8  : 0,
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
