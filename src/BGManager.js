"use strict"

LD38.BGManager = me.Renderable.extend({
	init: function() {
		this._super(
			me.Renderable,
			'init',
			[0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()]
		);

		this.floating = true;
		this.lastX = 0;

		this.layers = [
			{
				offset: new me.Vector2d(0, 0),
				tiles: ['level_1_bg'],
				speed: .001,
			},
			{
				offset: new me.Vector2d(0, 10),
				tiles: ['level_1_mg'],
				speed: .3,
			},
			{
				offset: new me.Vector2d(0, 118),
				tiles: ['level_1_fg_1', 'level_1_fg_2'],
				speed: 1,
			}
		];

		this.activeTiles = this.layers.map((layer) => {
			return [
				this.getNewTile(layer),
				this.getNewTile(layer),
				this.getNewTile(layer),
			];
		});

		for(var i = 0; i < this.activeTiles.length; i++) {
			this.activeTiles[i][1].pos.x = this.activeTiles[i][0].width;
			this.activeTiles[i][2].pos.x = this.activeTiles[i][1].width
				+ this.activeTiles[i][1].pos.x;
			this.activeTiles[i][0].pos.z = -8 + i;
			this.activeTiles[i][1].pos.z = -8 + i;
			this.activeTiles[i][2].pos.z = -8 + i;
		}
	},

	getNewTile: function(layer) {
		return new me.Sprite(layer.offset.x, layer.offset.y, {
			image: Array.prototype.random(layer.tiles), // TODO: Random
			anchorPoint: new me.Vector2d(1, 0),
		});
	},

	update: function(dt) {
		for(var i = 0; i < this.activeTiles.length; i++) {
			var speed = this.layers[i].speed;
			var chg = (me.game.viewport.pos.x - this.lastX) * speed;

			for(var j = 0; j < this.activeTiles[i].length; j++) {
				this.activeTiles[i][j].pos.x -= chg;
			}

			if(this.activeTiles[i][0].pos.x <= 0) {
				this.activeTiles[i].shift();
				var tile = this.getNewTile(this.layers[i]);
				tile.pos.x = this.activeTiles[i][1].pos.x + this.activeTiles[i][1].width;
				this.activeTiles[i].push(tile);
			}
		}
		this.lastX = me.game.viewport.pos.x;
		return true;
	},

	draw: function(renderer) {
		for(var i = 0; i < this.activeTiles.length; i++) {
			this.activeTiles[i][0].draw(renderer);
			this.activeTiles[i][1].draw(renderer);
			this.activeTiles[i][2].draw(renderer);
		}
	}
});


