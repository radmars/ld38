"use strict";

(function() {
	var noteBuilders = [
		(x) => {return new LD38.Chopper(x)},
		(x) => {return new LD38.Tank(x)},
		(x) => {return new LD38.Hoop(x)},
		(x) => {return new LD38.Robot(x)},
		(x) => {return new LD38.Man(x)},
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
			this.next      = settings.next;
			this.duration  = settings.duration;
			this.progress  = 0;
			this.floating  = true;
			this.msPerTick = 60 / (4 * bpm) * 1000;
			this.pxPerTick = settings.spacing
			this.pxPerMs   = this.pxPerTick / this.msPerTick;
			this.ticks     = {};
			this.started   = false;
			this.delay     = settings.delay;
			this.hp        = settings.hp;

			Object.keys(noteMap).forEach((tick) => {
				this.addNote(tick, noteMap[tick]);
			});

			for(
				var tick = 0;
				this.delay + tick * this.msPerTick < this.duration;
				tick += 4
			) {
				if(!(tick in this.ticks)) {
					this.addNote(tick, 4);
				}
			}

			Object.keys(this.ticks).forEach((tick) => {
				if(!this.ticks[tick]) {
					delete this.ticks[tick];
				}
			});

			this.tickList = Object.keys(this.ticks).map((x) => +x).sort(
				(a, b) => a - b
			);

			if(game.options.ff) {
				this.progress = this.delay + game.options.ff * this.msPerTick
				while(this.tickList[0] < game.options.ff) {
					this.removeNext();
				}
			}
		},

		getNext: function() {
			return this.ticks[this.tickList[0]];
		},

		removeNext: function() {
			var note = this.getNext();
			delete this.ticks[this.tickList.shift()];
			note.removeIcon();
			console.log(`Next tick is ${this.tickList[0] || "undefined"}`);
		},

		addNote: function(tick, noteNum) {
			var note;
			if(noteNum != undefined) {
				console.log("addNote");
				var x    = (tick * this.pxPerTick) + (this.delay * this.pxPerMs);
				var note = noteBuilders[noteNum](x);
				note.setTiming(tick, (tick * this.msPerTick) + (this.delay), this.pxPerMs);
				me.game.world.addChild(note);
				//note.addIcon();
			}
			this.ticks[tick] = note;
		},

		update: function(dt) {
			if(!this.started && this.progress > this.delay) {
				this.started = true;
				me.audio.playTrack(this.file)
				if(game.options.ff) {
					me.audio.seek(
						this.file,
						game.options.ff * this.msPerTick / 1000
					);
				}
			}

			if(this.progress > this.duration) {
				if(!this.finished) {
					me.audio.fade(this.file, 1, 0, 1000);
					me.game.viewport.fadeIn('#000', 1000, () => {
						me.state.current().reset();
						me.game.viewport.fadeOut('#000', 500);
					});
					this.finished = true;
				}
				return true;
			}

			this.progress += dt
			this.targetX = this.progress * this.pxPerMs;

			var next = this.getNext();

			if(!next) {
				return true;
			}

			if(next.isLate(this.progress)) {
				this.removeNext();
				this.owie();
				console.log("late!");
			}

			inputs.forEach((key) => {
				if(me.input.isKeyPressed(key)) {
					if(!next.isCorrectKey(key)) {
						this.removeNext();
						this.owie();
						console.log("Wrong key!");
					}
					else if(next.isEarly(this.progress)) {
						this.owie();
						console.log("Early!");
					}
					else {
						next.hit();
						this.removeNext();
						me.game.world.removeChild(next);
					}
				}
			});

			return true;
		},

		owie : function() {
			this.hp--;
			me.event.publish("hp change", [this.hp]);
		}
	});
})();
