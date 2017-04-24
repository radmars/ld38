"use strict"

LD38.FGLayer = me.Sprite.extend({
	init: function(x, y, settings) {
		this._super(me.Sprite, 'init', [x, y, settings]);
	},

	update: function(dt) {
		this._super(me.Sprite, 'update', [dt]);
		return true;
	},

});

LD38.BGManager = me.Renderable.extend({
	init: function(kaiju, levelId) {
		this._super(
			me.Renderable,
			'init',
			[0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()]
		);

		this.kaiju = kaiju;
		this.floating = true;
		this.lastX = 0;
		this.lastKaijuX = this.kaiju.pos.x;


		this.layers = [
			{
				offset: new me.Vector2d(0, 0),
				tiles: [levelId + '_bg'],
				speed: .05,
			},
			{
				offset: new me.Vector2d(0, 10),
				tiles: [levelId + '_mg'],
				speed: .15,
			},
			//{
			//	offset: new me.Vector2d(0, 111),
			//	tiles: [level + '_fg_1', level + '_fg_2'],
			//	speed: 1,
			//}
		];

		this.fgTiles = [this.addFGTile(levelId + "_fg_1"),this.addFGTile(levelId + "_fg_2"),this.addFGTile(levelId + "_fg_1")];
		for(var i = 1; i < this.fgTiles.length; i++) {
			this.fgTiles[i].pos.x = this.fgTiles[i-1].pos.x + this.fgTiles[i-1].width;
		}

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

	addFGTile: function(img) {
		var tile = new LD38.FGLayer(-150, 111, {
			image: img,
			anchorPoint: new me.Vector2d(0, 0),
		});
		//tile.floating = true;
		me.game.world.addChild(tile, 10);
		return tile;
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

		for(var i = 0; i < this.fgTiles.length; i++) {
			var baseX = this.kaiju.pos.x;
			var chg = (baseX - this.lastKaijuX);

			if(this.fgTiles[i].pos.x <= baseX-320-150) {
				var tile = this.fgTiles.shift();
				var l = this.fgTiles.length-1;
				tile.pos.x = this.fgTiles[l].pos.x + 320;
				this.fgTiles.push(tile);
			}
		}

		//console.log(" - this.kaiju.pos.x" + this.kaiju.pos.x);
		//this.x = this.kaiju.pos.x;
		this.lastKaijuX = this.kaiju.pos.x;
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


