var AllList=[];
var MainAll=function(actor){
	this.name=actor.key;
	this.step=function(arg0){

		if (actor.rotation == 0) {
				actor.body.velocity.y = -200;
			} else {
				actor.body.velocity.y =-200 * (Math.cos(actor.rotation));
				actor.body.velocity.x = 200 * (Math.sin(actor.rotation));
		}
		actor.animations.play(actor.key+'run', 10, true);
		setTimeout(function(){
		actor.animations.stop();
        actor.frame = 4;
		actor.body.velocity.x=0;
		actor.body.velocity.y=0;
	},100*arg0);
	atime=100*arg0+100
		
	}
	this.turnLeft=function(arg0){
		game.add.tween(actor).to({ angle: actor.body.rotation-arg0 },0.3 * 1000, 'Linear', true, 0);
		atime=0.3 * 1000+100
	}
	this.turnRight=function(arg0){
		game.add.tween(actor).to({ angle: actor.body.rotation+arg0 },0.3 * 1000, 'Linear', true, 0);
		atime=0.3 * 1000+100
	}
	this.getBounds=function(){
		return actor.getBounds();
	}
	
	AllList.push(this)
	return this;
}

