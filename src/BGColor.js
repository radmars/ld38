"use strict";
LD38.BGColor = me.Renderable.extend({
	init: function() {
		this._super(me.Renderable, 'init', [0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight()]);
		this.z = -10
	},
	draw: function(context) {
		context.setColor('#000');
		context.fillRect(0, 0, me.video.renderer.getWidth(), me.video.renderer.getHeight());
	},
});
