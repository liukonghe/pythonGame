var ActorImage=function(actor){
	//新建精灵
	this.sprite = game.add.sprite(actor.x, actor.y, actor.name);
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	//开启世界边界碰撞
	this.sprite.body.collideWorldBounds = true;
	this.sprite.inputEnabled = true;
	this.sprite.input.useHandCursor = true;
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.events.onInputOver.add(function(){
		var actorX = this.sprite.centerX;
		var actorY = this.sprite.y;
		textss = game.add.text(actorX, actorY, actor.name, {
			fill: 'white'
		});
	}, this);
	this.sprite.events.onInputOut.add(function(){
		textss.destroy();
	}, this);
	this.sprite.events.onInputDown.add(function(){
		TypingEffect(actor.name,0);
	}, this);
	return this.sprite
}
var textss;
var ActorSheet=function(actor){
	//新建精灵
	this.sprite = game.add.sprite(actor.x, actor.y, actor.name);
	
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	//开启世界边界碰撞
	this.sprite.body.collideWorldBounds = true;
	
	this.sprite.animations.add(actor.name+'run');
	// if(actor.time)
    // this.sprite.animations.play(actor.name+'run', actor.time, true);
	this.sprite.anchor.setTo(0.5, 0.5);
	this.sprite.inputEnabled = true;
	this.sprite.input.useHandCursor = true;
	this.sprite.events.onInputOver.add(function(){
		var actorX = this.sprite.centerX;
		var actorY = this.sprite.y;
		textss = game.add.text(actorX, actorY, actor.name, {
			fill: 'white'
		});
	}, this);
	this.sprite.events.onInputOut.add(function(){
		textss.destroy();
	}, this);
	this.sprite.events.onInputDown.add(function(){
		TypingEffect(actor.name,0);
	}, this);
	return this.sprite
}

var groupImage=function(actor){
	this.platforms = game.add.group();
	
    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;
	
    // Here we create the ground.
    var actorListname;
	for (var i = 0; i < 2; i++) {

		//  Create a star inside of the 'stars' group
		var yell = this.platforms.create(actor.x + i * 70, actor.y, actor.name);
		yell.anchor.setTo(0.5, 0.5);
		yell.body.immovable = true;
		yell.inputEnabled = true;
		yell.input.useHandCursor = true;
		yell.key=actor.name+"["+i+"]";
		yell.events.onInputOver.add(function () {
			var actorX = this.x;
			var actorY = this.y;
			textss = game.add.text(actorX, actorY, this.key, {
					fill: 'white'
			});
			actorListname = game.add.text(actorX, actorY+30, actor.name, {
					fill: 'white'
			});
				
		}, yell);
		yell.events.onInputOut.add(function () {
			textss.destroy();
			actorListname.destroy();
		}, yell);
		yell.events.onInputDown.add(function () {
			TypingEffect(this.key,0);
		}, yell);
	}

    
	return this.platforms.children;
}

