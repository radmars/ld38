"use strict";

(function() {
	var notes = [
		(x) => {return new LD38.Chopper(x)},
		(x) => {return new LD38.Tank(x)},
		(x) => {return new LD38.Hoop(x)},
		(x) => {return new LD38.Tank(x)},
	];

	LD38.Song = me.Renderable.extend({
		init: function(bpm, noteCallback) {
			this._super(
				me.Renderable,
				'init',
				[0, 0, 10, 10]
			);

			this.progress = 0;
			this.floating = true;
			this.msPerTick = 60 / (4 * bpm) * 1000;
			this.pxPerMs= 80/1000;
			this.pxPerTick = 4 * this.pxPerMs * this.msPerTick;
			console.log(`px per tick: ${this.pxPerTick}`);
			console.log(`ms per tick: ${this.msPerTick}`);
			console.log(`px per ms: ${this.pxPerMs}`);
			this.notes = [];

			noteCallback(this.addNote.bind(this));
		},

		addNote: function(tick, noteNum) {
			var x = this.pxPerTick * tick
			var note = notes[noteNum](x);
			note.tick = tick;
			me.game.world.addChild(note);
			this.notes.push(note);
		},

		update: function(dt) {
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

	LD38.Note = me.Sprite.extend({
		init: function(x, y, settings) {
			this._super(
				me.Sprite,
				'init',
				[x, y, { image: settings.image }]
			);
			this.key = settings.key;
		},

		update: function() {
			return true;
		},
	});

	LD38.Song.one = () => new LD38.Song(120, (_) => {
		_(4, 0);
		_(5, 0);
		_(6, 0);
		_(7, 1);
		_(8, 1);
		_(9, 1);
		_(10, 2);
		_(11, 2);
		_(12, 2);
		_(13, 3);
		_(14, 3);
		_(17, 3);
		_(18, 1);
		_(19, 2);
		_(20, 1);
		_(21, 3);
	});
})();
