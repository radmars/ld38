"use strict"

LD38.PlayScreen = me.ScreenObject.extend({
	init: function() {
		this._super(me.ScreenObject, 'init', arguments);
	},

	add: function(item, container) {
		container = container || me.game.world
		container.addChild(item);
		this.entities.push(item);
		return item;
	},

	onResetEvent: function() {
		me.audio.stopTrack();
		this.entities = [];

		this.nextSong = window.game.selectedLevel ||
			this.nextSong || window.game.options.song || 'level1';

		window.game.selectedLevel = null;

		this.song = this.add(LD38.Song[this.nextSong]());
		this.nextSong = this.song.next;
		this.kaiju = me.pool.pull('Kaiju', this.song);
		this.song.kaiju = this.kaiju;

		this.bg = this.add(new LD38.BGManager(this.kaiju, this.song.background));

		//this.add(this.kaiju);
		//add  kaiju to world so he sorts correctly.
		me.game.world.addChild(this.kaiju, 16);

		me.game.viewport.follow(this.kaiju.trackingPos, me.game.viewport.AXIS.HORIZONTAL);
		me.game.viewport.setDeadzone(0, 0);
		me.game.world.addChild(new LD38.HPDisplay(this.song.hp));
	},

	onDestroyEvent: function() {
		this.nextSong = window.game.options.song || 'level1';
		this.entities.forEach((item) => {
			if(item.ancestor) {
				item.ancestor.removeChild(item);
			}
			else {
				me.game.world.removeChild(item);
			}
		});
		this.entries = [];
		me.audio.stopTrack();
	},
});
