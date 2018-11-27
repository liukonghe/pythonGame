//var game = new Phaser.Game(gameSet);
var actorList = [{
		name: "monkey",
		x: 340,
		y: 340,
		imageurl: "assets/monkey.png"
	},/*  {
		name: "dude",
		sheet: true,
		x: 320,
		y: 48,
		time: 10,
		imageurl: "assets/dude.png",
		width: 32,
		height: 48
	}, */ {
		name: "peach1",
		group: true,
		imageurl: "assets/peach1.png",
		x: 190,
		y: 190,
		left: 110,
		top: 100
	}
];
var game = new Phaser.Game($("#stage").width(), $("#stage").height(), Phaser.CANVAS, "stage", {
		render: render,
		preload: preload,
		create: create,
		update: update
	});
function preload() {
	game.load.image('ruler_base', 'assets/ruler_base.png');
	game.load.image('background', 'assets/hgs.jpg');
	game.load.spritesheet('ruler', 'assets/new.png', 58, 56);
	for (var x in actorList) {
		if (actorList[x].sheet) {
			game.load.spritesheet(actorList[x].name, actorList[x].imageurl, actorList[x].width, actorList[x].height);
		} else if (actorList[x].group) {
			game.load.image(actorList[x].name, actorList[x].imageurl);
		} else if (actorList[x].audio) {
			game.load.audio(actorList[x].name, actorList[x].audiourl);
		} else
			game.load.image(actorList[x].name, actorList[x].imageurl);
	}
};
var ruler_base;
var ruler;
var clickrulernum = 0 //点击尺子的次数
	var statedeg = false; //默认不开启尺子
function create() {
	game.add.image(0, 0, "background");
	game.physics.startSystem(Phaser.Physics.ARCADE);
	for (var x in actorList) {
		if (actorList[x].sheet)
			eval(actorList[x].name + "=new MainAll(new ActorSheet(actorList[x]))");
		else if (actorList[x].group) {
			eval(actorList[x].name + "=new groupImage(actorList[x])");
			var actorAllList = eval(actorList[x].name);
			var aaa = [];
			for (var i in actorAllList) {
				aaa.push(new MainAll(actorAllList[i]))
			}
			eval(actorList[x].name + "=aaa");
		} else
			eval(actorList[x].name + "=new MainAll(new ActorImage(actorList[x]))")
	}

	createruler()
};
var timeaa = true;
var actorfun;
function update() {
	updateruler()

}

function render() {
	renderruler()

}

var atime = 0
	$(".run").click(function () {
		var stringOfCode = editor.getValue();
		var str = rapydscript.compile(stringOfCode, output_options);
		var waitstep = "function wrap(wait) {\n\
			var iter;\n\
			iter = wait();\n\
			const f = () => {\n\
			const {\n\
			value\n\
			} = iter.next()\n\
			value && value.then(f)\n\
			}\n\
			f();\n\
			}\n\
			function  * wait() {\n\
			var p = () => new Promise(resolve => {\n\
			setTimeout(() => resolve(), atime)\n\
			})\n" + str + "\n\
			}\n\
			wrap(wait);"
			eval(waitstep);
	});
$(".again ").click(function () {
	stage.playing = false;
	game.state.restart(true);
	game.input.gamepad.reset();
});

$('.actions').click(function () {
	TypingEffect("." + $(this).find('p').text(), 0, true);
});
