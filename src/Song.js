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
			this.hp  = this.hpMax = 20;//settings.hp;
			this.alive 		= true;
			this.deathTimer = 3000;
			this.background = settings.background;

			this.kaiju = null;

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

		onDie: function() {
			// TODO: stop music?
			this.kaiju.die();
		},

		removeNext: function() {
			var note = this.getNext();
			delete this.ticks[this.tickList.shift()];
			note.removeIcon();
		},

		addNote: function(tick, noteNum) {
			var note;
			if(noteNum != undefined) {
				var x    = (tick * this.pxPerTick) + (this.delay * this.pxPerMs);
				var note = noteBuilders[noteNum](x);
				note.setTiming(tick, (tick * this.msPerTick) + (this.delay), this.pxPerMs);
				//add them later..
			}
			this.ticks[tick] = note;
		},

		addResult: function(id, x, y) {
			var explosion = me.pool.pull('Explosion', x, y, id);
			me.game.world.addChild(explosion);
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
                    if(this.next) {
                        me.game.viewport.fadeIn('#000', 1000, () => {
                            me.state.current().reset();
                            me.game.viewport.fadeOut('#000', 500);
                        });
                    }
                    else {
                        me.state.change(LD38.Game.States.Win);
                    }

					this.finished = true;
				}
				return true;
			}

			if(this.alive) {
				this.progress += dt;
			}else{
				this.deathTimer -=dt;
				if(this.deathTimer <=0 && !this.finished){
					//change to game over?
					me.audio.fade(this.file, 1, 0, 1000);
					me.state.change(LD38.Game.States.GameOver);
                    this.finished = true;
					return true;
				}
			}
			this.targetX = this.progress * this.pxPerMs;

			var n;
			for(var i=0; i<10; i++) {
				if (this.tickList.length > i) {
					n = this.ticks[this.tickList[i]];
					if (!n.active) {
						me.game.world.addChild(n, 20);
						n.active = true;
						n.addIcon();
						n.iconActive = true;
					}
				}
			}

			var next = this.getNext();
			if(!next) {
				return true;
			}else{
				if(!next.iconActive) {
					next.addIcon();
					next.iconActive = true;
				}
			}

			if(next.isLate(this.progress)) {
				this.addResult("miss", next.icon.pos.x, next.icon.pos.y);
				this.removeNext();
				this.owie();
			}

			var dist = 0;
			if(this.kaiju != null){
				dist = Math.abs(( this.kaiju.pos.x - next.pos.x));
			}

			if( next.key == "right" && dist <= 60){
				//its a dunk, time for predunk.
				if(!this.kaiju.isCurrentAnimation("pre_dunk")) {
					this.kaiju.predunk();
				}
			}

			inputs.forEach((key) => {
				if(me.input.isKeyPressed(key)) {
					if(!next.isCorrectKey(key) ) {
						if(dist <= 40){
							this.addResult("miss", next.icon.pos.x, next.icon.pos.y);
							this.removeNext();
							this.owie();
						}
					}
					else if(next.isEarly(this.progress)) {
						this.owie();
					}
					else {
						this.addResult("great", next.icon.pos.x, next.icon.pos.y);
						this.kaiju.hit(key);

						if( next.key == "right" ){
							this.hp += 2.5;
						}
						else {
							this.hp += 0.25;
						}

						if(this.hp > this.hpMax){
							this.hp = this.hpMax;
						}

						next.hit();
						this.removeNext();
						me.game.world.removeChild(next);
						me.event.publish("hp change", [this.hp]);
					}
				}
			});

			return true;
		},

		owie : function() {
			if(this.hp <= 0) {
				if( this.alive ){
					this.alive = false;
					this.onDie();
				}
				return;
			}

			this.hp--;
			me.event.publish("hp change", [this.hp]);
			me.audio.play("hit", false, null, 0.5);
			this.kaiju.miss();
		}
	});
})();
