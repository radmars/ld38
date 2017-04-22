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

		this.kaiju = this.add(me.pool.pull('Kaiju', 80, 100));

		this.add(me.pool.pull('Man', 130, 125));
		this.add(me.pool.pull('Hoop', 300, 75));
		this.add(me.pool.pull('Chopper', 230, 40));
		this.add(me.pool.pull('Tank', 200, 125));

		me.game.viewport.follow(this.kaiju, me.game.viewport.AXIS.HORIZONTAL);
		me.game.viewport.setDeadzone(0, 0);
	},

	onDestroyEvent: function() {
		this.entities.forEach((item) => {
			item[0].removeChild(item[1]);
		});
		this.entries = [];
		me.audio.stopTrack();
	},
});
