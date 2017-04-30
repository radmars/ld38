"use strict"

LD38.LevelScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', arguments);
	},

	onResetEvent: function() {
		this.finished = false;
		this.subscription = me.event.subscribe( me.event.KEYDOWN, this.keyHandler.bind(this));
		this.bg = new LD38.LevelScreen.BG();
		me.game.world.addChild(this.bg);
		this.levels = [1,2,3].map((l, i) => {
			return new LD38.LevelScreen.Level(i * 70 + 89, 132, l);
		});
		this.levels.forEach((l) => {
			me.game.world.addChild(l);
		});

		this.selector = new LD38.LevelScreen.Selector();
		this.selectorIndex = 0;
		this.selector.setLevel(this.levels[this.selectorIndex]);
		me.game.world.addChild(this.selector);
		me.game.world.addChild(new LD38.HitEnter());
	},

	keyHandler: function (action, keyCode, edge) {
		if(action == "start" && !this.finished) {
			game.selectedLevel = this.levels[this.selectorIndex].level;
			me.state.change(LD38.Game.States.Play);
			me.audio.fade("ld38-title", 1.0, 0.0, 1000);
			this.finished = true;
		}
		else if(action == "left") {
			this.moveSelector(-1);
		}
		else if(action == "right") {
			this.moveSelector(1);
		}
	},

	moveSelector: function(amt) {
		this.selectorIndex = (this.selectorIndex + amt) % this.levels.length;
		if(this.selectorIndex < 0) {
			this.selectorIndex = this.levels.length - 1;
		}
		this.selector.setLevel(this.levels[this.selectorIndex]);
	},

	onDestroyEvent: function() {
		me.game.world.removeChild(this.bg);
		me.event.unsubscribe(this.subscription);
		this.levels.forEach((x) => {
			me.game.world.removeChild(x);
		});
		me.game.world.removeChild(this.selector);
	},
});

LD38.LevelScreen.BG = me.Sprite.extend({
	init: function() {
		this._super(me.Sprite, "init", [
			0, 0,
			{
				anchorPoint: new me.Vector2d(0, 0),
				image: 'level_select_bg',
			}
		]);
	},
});

LD38.LevelScreen.Selector = me.Sprite.extend({
	init: function() {
		this._super(me.Sprite, "init", [
			0, 0, {
				image: `level_select_selector`,
			},
		]);
	},
	setLevel: function(l){
		this.pos.x = l.pos.x;
		this.pos.y = l.pos.y;
		this.level = l;
	},
	update: function() {
		return true;
	},
});

LD38.LevelScreen.Level = me.Sprite.extend({
	init: function(x, y, level) {
		this._super(me.Sprite, "init", [
			x, y, {
				image: `level_select_level_${level}`,
			},
		]);
		this.level = `level${level}`;
	}
});
