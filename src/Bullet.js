"use strict";

LD38.Bullet = me.Sprite.extend({
    init: function(settings) {
        var img = "bullet_tank";
        var vel = new me.Vector2d(-75,0);
        switch( settings.type ){
            case "man":
                img = "bullet_man";
                vel = new me.Vector2d(-95,-75);
                break;
            case "tank":
                img = "bullet_tank";
                vel = new me.Vector2d(-85,-35);
                break;
            case "chopper":
                img = "bullet_chopper";
                vel = new me.Vector2d(-95,20);
                break;
        }

        vel.x += Math.random()*10;
        vel.y += Math.random()*10;

        var sprite =  {
            image: img,
            framewidth: 16,
            frameheight: 16,
            anchorPoint: new me.Vector2d(.5, .5)
        };

        this._super(me.Sprite, 'init', [settings.x, settings.y, sprite]);
        this.velocity = vel;
        this.life = 400 + Math.random()*400;
        this.alwaysUpdate = true;
    },

    draw: function(renderer) {
        this._super(me.Sprite, 'draw', [renderer]);
    },

    update: function(dt) {

        this.life -=dt;
        if(this.life <= 0) {
            this.die();
            me.game.world.removeChild(this);
            return;
        }

        this.pos.x += this.velocity.x * dt/1000;
        this.pos.y += this.velocity.y * dt/1000;

        this._super(me.Sprite, 'update', [dt]);


        return true;
    },

    die: function() {
        var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "firesmoke");
        me.game.world.addChild(explosion, 1000);
    },
});
