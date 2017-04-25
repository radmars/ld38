"use strict";

LD38.Particle = me.Sprite.extend({
    init: function(settings, img, vel) {

        var sprite =  {
            image: img,
            anchorPoint: new me.Vector2d(.5, .5)
        };

        this._super(me.Sprite, 'init', [settings.x, settings.y, sprite]);
        this.velocity = vel;
        this.life = 500 + Math.random()*500;
        this.gravity = 500;
        this.groundY = 140;
        this.smokeTimer = 200;
        this.alwaysUpdate = true;
    },

    draw: function(renderer) {
        this._super(me.Sprite, 'draw', [renderer]);
    },

    update: function(dt) {
        this.life -=dt;
        if(this.life <= 0 ) {
            this.die();
            return;
        }
        this.velocity.y += this.gravity * dt/1000;

        this.pos.x += this.velocity.x * dt/1000;
        this.pos.y += this.velocity.y * dt/1000;

        if(this.pos.y > this.groundY){
            this.pos.y = this.groundY;
            if( this.velocity.y > 0) {
                this.velocity.y *= -0.5;
                this.velocity.x *=0.5;
            }
        }

        this.smokeTimer-=dt;
        if(this.smokeTimer <= 0){
            this.smokeTimer = 200;
            var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "firesmoke");
            me.game.world.addChild(explosion);
        }

        this._super(me.Sprite, 'update', [dt]);

        return true;
    },

    die: function() {
        me.game.world.removeChild(this);
        var explosion = me.pool.pull('Explosion', this.pos.x, this.pos.y, "firesmoke");
        me.game.world.addChild(explosion, 1000);
    },
});
