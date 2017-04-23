"use strict"

LD38.PlayScreen = me.ScreenObject.extend({
	add: function(item, container) {
		container = container || me.game.world
		container.addChild(item);
		this.entities.push([container, item]);
		return item;
	},

	onResetEvent: function() {
		this.entities = [];
		this.bg = this.add(new LD38.BGManager());
		this.song = this.add(LD38.Song.one());

		this.kaiju = this.add(me.pool.pull('Kaiju', this.song));

		this.add(me.pool.pull('Man', 130, 125));

		me.game.viewport.follow(this.kaiju, me.game.viewport.AXIS.HORIZONTAL);
		me.game.viewport.setDeadzone(0, 0);
		me.game.world.addChild(new LD38.HPDisplay());
	},

	onDestroyEvent: function() {
		this.entities.forEach((item) => {
			item[0].removeChild(item[1]);
		});
		this.entries = [];
		me.audio.stopTrack();
	},
});
